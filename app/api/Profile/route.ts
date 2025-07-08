import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/DB";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.id) {
    return NextResponse.json(
      {
        success: false,
        message: "Please login first",
      },
      {
        status: 409,
      }
    );
  }

  const userid = token.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userid) },
      include: {
        send: true,
        recieved: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "The user is not registered. ",
      });
    }

    return NextResponse.json(
      {
        success: true,
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong.",
        },
        {
          status: 500,
        }
      );
    }
  }

  return NextResponse.json(
    {
      success: false,
      message: "Internal Server Error",
    },
    {
      status: 500,
    }
  );
}
