import { NextRequest, NextResponse } from "next/server";
import razorpay from "@/lib/razorpayConfig";
import z from "zod";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/DB";
const transactionSchema = z.object({
  amount: z.preprocess((val) => Number(val), z.number().positive()),
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
        token,
      },
      {
        status: 401,
      }
    );
  }

  const userid = Number(token.id);

  const amount = Number(parsedbody.data.amount);

  try {
    const existSender = await prisma.user.findUnique({
      where: {
        id: userid,
      },
    });

    if (!existSender) {
      return NextResponse.json(
        {
          success: false,
          message: "Please register first",
          token,
        },
        {
          status: 404,
        }
      );
    }

    if (existSender.balance <= amount - 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Insufficent Balance.",
          token,
        },
        {
          status: 403,
        }
      );
    }

    const existReciever = await prisma.user.findFirst({
      where: {
        number: "+91" + parsedbody.data.Number.toString(),
      },
    });

    if (!existReciever) {
      return NextResponse.json(
        {
          success: false,
          message: "Reciever not found",
          token,
          existReciever,
        },
        {
          status: 404,
        }
      );
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects the amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order canceled",
          token,
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        senderid: existSender.id,
        recieverid: existReciever.id,
        amount,
        order,
      },
      { status: 200 }
    );
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
