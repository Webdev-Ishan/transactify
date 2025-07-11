import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/DB";
import z from "zod";
import { getToken } from "next-auth/jwt";
import { Resend } from "resend";

 const Contactschema = z.object({
  topic: z.string().min(2).max(20),
  content: z.string().min(12).max(100),
});

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  

  const data = await req.json();
  const parsedBody = Contactschema.safeParse(data);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        success: false,
        error: parsedBody.error.format(),
      },
      {
        status: 400,
      }
    );
  }

  const { content, topic } = parsedBody.data;

  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

  if (!token || !token.id) {
    return NextResponse.json(
      { success: false, error: "Please login" },
      { status: 403 }
    );
  }

  const userid = token.id;

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


    const formalreadyexists = await prisma.contact.findFirst({
      where:{
        senderId:exist.id
      }
    })

    if(formalreadyexists){
       return NextResponse.json(
        {
          success: false,
          error: "Form is already submitted.",
        },
        {
          status: 411,
        }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        topic: topic,
        content: content,
        senderId:exist.id
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

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: exist.email,
      subject: "Contact request is submitted",
      html: "Your form for the enquiry is sumitted , our team will reach out to you soon.",
    });

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
