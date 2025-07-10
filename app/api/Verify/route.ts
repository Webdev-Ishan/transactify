import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/DB";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    senderId,
    receiverId,
    amount,
  } = body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return NextResponse.json(
      { success: false, message: "Payment verification failed" },
      { status: 400 }
    );
  }

  // ✅ Verified: Now create transaction and update balances atomically
  const amountNumber = Number(amount);
  const sender = await prisma.user.findUnique({ where: { id: senderId } });
  const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!sender || !receiver) {
    return NextResponse.json(
      { success: false, message: "Invalid users" },
      { status: 404 }
    );
  }

  const newSenderBalance = sender.balance - amountNumber;
  const newReceiverBalance = receiver.balance + amountNumber;

  const [transaction] = await prisma.$transaction([
    prisma.transaction.create({
      data: {
        amount: amountNumber,
        Status: "COMPLETED",
        senderId,
        receiverId,
        razorpayID: razorpay_payment_id,
      },
    }),
    prisma.user.update({
      where: { id: senderId },
      data: { balance: newSenderBalance },
    }),
    prisma.user.update({
      where: { id: receiverId },
      data: { balance: newReceiverBalance },
    }),
  ]);

      await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: sender.email,
      subject: "Transaction alert",
       text:`A transaction from your account has been done to ${receiver.number} of amount ${amount}`
    });

  return NextResponse.json({ success: true, transaction });
}
