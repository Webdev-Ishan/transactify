import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/DB";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    senderId,
    receiverId,
    amount,
  } = body;

  if (
    !razorpay_payment_id ||
    !razorpay_order_id ||
    !razorpay_signature ||
    !senderId ||
    !receiverId ||
    !amount
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Payment failed due to missing credentials.",
      },
      {
        status: 409,
      }
    );
  }

  const verify_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (verify_signature !== razorpay_signature) {
    return NextResponse.json(
      {
        success: false,
        message: "Payment Verification failed!",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const amountNumber = Number(amount);
    const sender = await prisma.user.findUnique({ where: { id: senderId } });
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!amountNumber || !sender || !receiver || !resend) {
      return NextResponse.json(
        {
          success: false,
          message: "User details not found",
        },
        {
          status: 404,
        }
      );
    }

    const newSenderbalance = sender.balance - amountNumber;
    const newReceiverbalance = receiver.balance + amountNumber;

    const [transaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          amount: amount,
          Status: "COMPLETED",
          senderId,
          receiverId,
          completedAt: new Date(Date.now()),
          razorpayID: razorpay_payment_id,
        },
      }),

      prisma.user.update({
        where: {
          id: senderId,
        },
        data: {
          balance: newSenderbalance,
        },
      }),
      prisma.user.update({
        where: {
          id: receiverId,
        },
        data: {
          balance: newReceiverbalance,
        },
      }),
    ]);

    await resend.emails.send({
      from: "Transactify <onboarding@resend.dev>",
      to: sender.email,
      subject: "Transaction alert",
      text: `A transaction from your account has been done to ${receiver.number} of amount ${amount}`,
    });

    await resend.emails.send({
      from: "Transactify <onboarding@resend.dev>",
      to: receiver.email,
      subject: "Transaction alert",
      text: `A transaction to your account has been done by ${receiver.number} of amount ${amount}`,
    });

    return NextResponse.json({ success: true, transaction });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
