import { prisma } from "@/lib/DB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { Resend } from "resend";

 const registerSchema = z.object({
  username: z.string().min(3).max(16),
  email: z.string().nonempty(),
  password: z.string().min(6),
  number: z.string().length(10),
  upiID: z.string().regex(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format"),
  balance: z.number(),
});

const salt = process.env.SALT;

const resend = new Resend(process.env.RESEND_API_KEY);

const otp = Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedBody = registerSchema.safeParse(data);

  if (!parsedBody.success) {
    return NextResponse.json(
      { success: false, error: parsedBody.error.format() },
      { status: 400 }
    );
  }

  if (!salt || isNaN(Number(salt))) {
    return NextResponse.json(
      { success: false, error: "Invalid salt value in environment." },
      { status: 400 }
    );
  }

  const { username, email, password, number, upiID, balance } = parsedBody.data;

  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ number: number }, { email: email }] },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exist, Please Login" },
        { status: 409 }
      );
    }

    const saltvalue = await bcrypt.genSalt(Number(salt));
    const hashedPassword = await bcrypt.hash(password, saltvalue);

    const newNumber = "+91".concat(number);

    const createduser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        number: newNumber,
        upiID,
        isVerified: false,
        balance,
      },
    });

    if (!createduser) {
      return NextResponse.json(
        { success: false, error: "Oops try again!!" },
        { status: 409 }
      );
    }

    await prisma.otp.create({
      data: {
        email: createduser.email,
        otp,
        expiresAt: new Date(Date.now() + 60 * 1000),
      },
    });

    await resend.emails.send({
      from: "Transactify <onboarding@resend.dev>",
      to: createduser.email,
      subject: "OTP verification",
      html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Your OTP Code</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f6f6f6; font-family: 'Segoe UI', sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 32px;">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h2 style="margin: 0; font-size: 24px; color: #333333;">Your OTP Code</h2>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom: 16px;">
                <p style="margin: 0; font-size: 16px; color: #555555;">Use the code below to complete your login:</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 24px 0;">
                <div style="display: inline-block; font-size: 28px; letter-spacing: 12px; font-weight: bold; background: #f0f0f0; padding: 12px 24px; border-radius: 8px; color: #000000;">
                  ${otp}
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 16px;">
                <p style="margin: 0; font-size: 14px; color: #888888;">This code will expire in 10 minutes.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 32px;">
                <p style="margin: 0; font-size: 12px; color: #bbbbbb;">
                  If you didn’t request this, please ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 24px;">
                <p style="margin: 0; font-size: 14px; color: #333333;"><strong>Transactify Team</strong></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
  }

  return NextResponse.json(
    { success: false, error: "Internal Server Error" },
    { status: 500 }
  );
}
