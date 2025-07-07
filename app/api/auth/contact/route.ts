import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/DB";
import z from "zod";

export const Contactschema = z.object({

    
})

export async function POST(req: NextRequest) {




  try {
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
