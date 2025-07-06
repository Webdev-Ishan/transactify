import { prisma } from "@/lib/DB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { Resend } from "resend";

export const registerSchema = z.object({
  username: z.string().min(3).max(16),
  email: z.string().nonempty(),
  password: z.string().min(6),
  number: z.string().length(10),
  upiID: z.string().regex(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format"),
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

  const { username, email, password, number, upiID } = parsedBody.data;

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
      from: "Acme <onboarding@resend.dev>",
      to: createduser.email,
      subject: "Hello world",
      text: `Welcome to Transactify. Ypur otp is ${otp}`,
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
