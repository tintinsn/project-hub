import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";

export async function POST(request: NextRequest) {
  // recieve request body from form
  try {
    const { email, name, password } = await request.json();
    

    // Hash password ก่อนบันทึกลงฐานข้อมูล
    const hashedPassword = bcrypt.hashSync(password, 10);

    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
