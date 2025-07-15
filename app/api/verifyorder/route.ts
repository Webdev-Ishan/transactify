import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/DB";
import { Resend } from "resend";
import z from "zod";

const paymentSchema = z.object({
  razorpay_payment_id: z.string(),
  razorpay_order_id: z.string(),
  razorpay_signature: z.string(),
  senderId: z.number(),
  receiverId: z.number(),
  amount: z.number().positive(), // must be in paise
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = paymentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    senderId,
    receiverId,
    amount: validatedAmount, // ✅ safer name
  } = parsed.data;

  // Step 1: Verify signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json(
      {
        success: false,
        message: "❌ Razorpay signature verification failed",
      },
      { status: 400 }
    );
  }

  try {
    // Step 2: Fetch sender and receiver
    const [sender, receiver] = await Promise.all([
      prisma.user.findUnique({ where: { id: senderId } }),
      prisma.user.findUnique({ where: { id: receiverId } }),
    ]);

    if (!sender || !receiver) {
      return NextResponse.json(
        { success: false, message: "Sender or receiver not found" },
        { status: 404 }
      );
    }

    // Step 3: Ensure sender has sufficient balance
    if (sender.balance < validatedAmount) {
      return NextResponse.json(
        { success: false, message: "Sender has insufficient balance" },
        { status: 403 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const safeamount = Math.round(validatedAmount * 100); // ← ✅ Convert rupees to paise
    console.log(safeamount);
    console.log(typeof safeamount);
    // Step 4: Perform atomic transaction
    const [transaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          amount: safeamount.toString(),
          Status: "COMPLETED",
          senderId,
          receiverId,
          razorpayID: razorpay_payment_id,
        },
      }),
      prisma.user.update({
        where: { id: senderId },
        data: { balance: { decrement: validatedAmount } },
      }),
      prisma.user.update({
        where: { id: receiverId },
        data: { balance: { increment: validatedAmount } },
      }),
    ]);

    // Step 5: Send emails (fail silently if needed)
    if (sender.email) {
      await resend.emails.send({
        from: "Transactify <onboarding@resend.dev>",
        to: sender.email,
        subject: "💸 Transaction Sent",
        text: `You sent ₹${validatedAmount} to ${receiver.number}`,
      });
    }

    if (receiver.email) {
      await resend.emails.send({
        from: "Transactify <onboarding@resend.dev>",
        to: receiver.email,
        subject: "💰 Transaction Received",
        text: `You received ₹${validatedAmount} from ${sender.number}`,
      });
    }

    return NextResponse.json({
      success: true,
      transaction,
      amount: validatedAmount,
    });
  } catch (error) {
    console.error("Transaction error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
