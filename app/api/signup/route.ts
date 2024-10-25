import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { z } from "zod";
import { generateSlug } from "@/utils/generateSlug";

const UserSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(2).max(100),
  password: z.string().min(8).max(100),
});

export async function POST(request: NextRequest) {
  // recieve request body from form
  try {
    const body = await request.json();
    

    const { email, name, password } = UserSchema.parse(body);

    // Hash password ก่อนบันทึกลงฐานข้อมูล
    const hashedPassword = await bcrypt.hash(password, 12);

    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    const result = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          image: `https://robohash.org/${encodeURIComponent(name)}.png`,
        },
      });

      const slug = generateSlug(name, user.id);

      const profile = await prisma.profile.create({
        data: {
          userId: user.id,
          slug,
          jobTitle: "Developer",
          bio: `Hi, I'm ${name}!`,
          githubLink: "https://github.com/",
          linkedinLink: "https://www.linkedin.com/",
          phoneNumber: "",
          email: "",
          address: "",
          technicalSkills: [],
          tools: [],
          education: [],
          experience: [],
        },
      });

      return { user, profile };
    });

    const { password: _, ...userWithoutPassword } = result.user;
    return NextResponse.json(
      {
        user: userWithoutPassword,
        profile: result.profile,
      },
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block",
        },
      },
    );
  } catch (error: unknown) {
    console.error("Error creating user and profile:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      if ("code" in error && error.code === "P2002") {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 },
        );
      }

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 },
    );
  }
}
