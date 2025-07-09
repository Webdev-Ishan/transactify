import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/DB";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
  console.log("Token in request:", token);
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

  try {
    // Get user info
    const user = await prisma.user.findUnique({
      where: { id: userid },
      select: {
        id: true,
        username: true,
        email: true,
        upiID: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please register first",
        },
        { status: 404 }
      );
    }

    // Get transactions (sent or received)
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ senderId: userid }, { receiverId: userid }],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        sender: {
          select: {
            username: true,
          },
        },
        receiver: {
          select: {
            username: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        userinfo: {
          username: user.username,
          upiID: user.upiID,
          email: user.email,
        },
        transactions,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Profile fetch failed:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
