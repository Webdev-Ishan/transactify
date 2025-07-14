import { NextRequest, NextResponse } from "next/server";
import razorpay from "@/lib/razorpayConfig";
import z from "zod";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/DB";

const transactionSchema = z.object({
  amount: z.preprocess(
    (val) => Number(val),
    z.number().positive("Amount must be a positive number")
  ),
  Number: z.number(),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedbody = transactionSchema.safeParse(data);

  if (!parsedbody.success) {
    return NextResponse.json(
      {
        success: false,
        message: parsedbody.error.flatten(),
      },
      {
        status: 403,
      }
    );
  }

  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

  if (!token || !token.id) {
    return NextResponse.json(
      {
        success: false,
        message: "Please login first",
      },
      {
        status: 401,
      }
    );
  }

  const userid = Number(token.id);
  const amount = parsedbody.data.amount;
  const receiverNumber = "+91" + parsedbody.data.Number.toString();

  try {
    const existSender = await prisma.user.findUnique({ where: { id: userid } });

    if (!existSender) {
      return NextResponse.json(
        { success: false, message: "Please register first" },
        { status: 404 }
      );
    }

    if (existSender.balance - amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Insufficient Balance", amount },
        { status: 403 }
      );
    }

    const existReceiver = await prisma.user.findFirst({
      where: { number: receiverNumber },
    });

    if (!existReceiver) {
      return NextResponse.json(
        { success: false, message: "Receiver not found" },
        { status: 404 }
      );
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order creation failed" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        senderid: existSender.id,
        recieverid: existReceiver.id,
        amount,
        order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
