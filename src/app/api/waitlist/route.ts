import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const newEntry = await prisma.waitlist.create({
      data: {
        email: email,
      },
    });
    return NextResponse.json(
      { message: "Successfully added to waitlist" },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      // Unique constraint violation (email already exists)
      return NextResponse.json(
        { error: "Email already exists in waitlist" },
        { status: 409 }
      );
    } else {
      console.error("Error adding to waitlist:", error);
      return NextResponse.json(
        { error: "Error adding to waitlist" },
        { status: 500 }
      );
    }
  }
}
