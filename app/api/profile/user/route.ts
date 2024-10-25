import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    

    const {
      userId,
      name,
      jobTitle,
      bio,
      githubLink,
      linkedinLink,
      phoneNumber,
      email,
      address,
      technicalSkills,
      image,
    } = body;

    // ใช้ Prisma Transaction เพื่ออัปเดตทั้ง User และ Profile พร้อมกัน
    const result = await prisma.$transaction(async (prisma) => {
      // อัปเดตข้อมูลใน User
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name, 
          image,
        },
      });

      // อัปเดตข้อมูลใน Profile ของผู้ใช้
      const updatedProfile = await prisma.profile.update({
        where: { userId }, // อัปเดตจาก userId
        data: {
          jobTitle,
          bio,
          githubLink,
          linkedinLink,
          phoneNumber,
          address,
          email,
          technicalSkills,
        },
      });

      return { updatedUser, updatedProfile };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user and profile" },
      { status: 500 },
    );
  }
}
