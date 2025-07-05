import { prisma } from "@/lib/DB";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const otpSchema = z.object({
  otp: z.string().length(6),
  email: z.string(),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedBody = otpSchema.safeParse(data);

  if (!parsedBody.success) {
    return NextResponse.json(
      { success: false, error: parsedBody.error.format() },
      { status: 400 }
    );
  }

  const { email, otp } = parsedBody.data;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Register first please!!" },
        { status: 409 }
      );
    }

    if (user && !user.isVerified) {
      const stored = await prisma.otp.findFirst({
        where: { email, otp },
      });

      if (!stored || stored.expiresAt < new Date()) {
        return NextResponse.json({
          success: false,
          error: "OTP expired or invalid",
        });
      }

      // ✅ OTP is valid – now verify user and delete OTP
      await prisma.user.update({
        where: { email },
        data: { isVerified: true },
      });

      await prisma.otp.deleteMany({
        where: { email },
      });

      return NextResponse.json(
        { success: true, message: "Verification successful" },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
  }
}
