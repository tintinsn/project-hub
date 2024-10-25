import authOptions from "@/app/libs/auth";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";

import { NextRequest, NextResponse } from "next/server";

const getSession = async () => {
  return await getServerSession(authOptions);
};

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { start_date, end_date, major, university } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    if (!user || !user.profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const newEducation = {
      id: uuidv4(),
      start_date,
      end_date,
      major,
      university,
    };

    const updatedProfile = await prisma.profile.update({
      where: { id: user.profile.id },
      data: {
        education: {
          push: newEducation,
        },
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Error creating education:", error);
    return NextResponse.json(
      { error: "Failed to create education" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    if (!user || !user.profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const educations = user.profile.education || [];

    return NextResponse.json(educations);
  } catch (error) {
    console.error("Error fetching educations:", error);
    return NextResponse.json(
      { error: "Failed to fetch educations" },
      { status: 500 },
    );
  }
}

