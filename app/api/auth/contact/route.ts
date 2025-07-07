import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/DB";
import z from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

export const Contactschema = z.object({
  topic: z.string().min(12).max(100),
  content: z.string().min(2).max(20),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedBody = Contactschema.safeParse(data);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        success: false,
        error: parsedBody.error.format(),
      },
      {
        status: 403,
      }
    );
  }

  const { content, topic } = parsedBody.data;

  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return NextResponse.json(
      {
        success: false,
        error: "Please login",
      },
      {
        status: 403,
      }
    );
  }

  const userid = session.user.id;

  try {
    const exist = await prisma.user.findFirst({
      where: {
        id: Number(userid),
      },
    });

    if (!exist) {
      return NextResponse.json(
        {
          success: false,
          error: "User not registered",
        },
        {
          status: 404,
        }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        topic: topic,
        content: content,
      },
    });

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          error: "OOps try again!!",
        },
        {
          status: 411,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Form is submitted",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 409,
        }
      );
    }
  }

  return NextResponse.json(
    {
      success: false,
      error: "Something went wrong",
    },
    {
      status: 500,
    }
  );
}
