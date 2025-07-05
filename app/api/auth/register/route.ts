import { prisma } from "@/lib/DB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { transporter } from "@/lib/nodemailer";

export const registerSchema = z.object({
  username: z.string().min(3).max(16),
  email: z.string().nonempty(),
  password: z.string(),
  number: z.string().length(10),
  upiID: z.string().regex(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format"),
});

const salt = process.env.SALT;

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
    const exist = await prisma.user.findFirst({
      where: { OR: [{ number: number }, { email: email }] },
    });

    if (exist) {
      return NextResponse.json(
        { success: false, error: "User already exist, Please Login" },
        { status: 409 }
      );
    }

    const saltvalue = await bcrypt.genSalt(Number(salt));
    const hashedPassword = await bcrypt.hash(password, saltvalue);

    const newNumber = "+91".concat(number);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        number: newNumber,
        upiID,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Oops try again!!" },
        { status: 409 }
      );
    }

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account is registered",
      text: `Your registration at Transactify is done.`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Registration sucessfull" },
      { status: 200 }
    );
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
