import authOptions from "@/app/libs/auth";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

 const getSession = async () => {
  return await getServerSession(authOptions);
};

export async function PUT(
  request: NextRequest,
  { params }: { params: { educationId: string } },
) {
  try {
    const { educationId } = params;
    const session = await getSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedData = await request.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    if (!user || !user.profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const educations =
      (user.profile.education as Array<{
        id: string;
        [key: string]: any;
      }>) || [];

    const educatioinIndex = educations.findIndex(
      (exp) => exp.id === educationId,
    );

    if (educatioinIndex === -1) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 },
      );
    }

    // Update the education
    educations[educatioinIndex] = {
      ...educations[educatioinIndex],
      ...updatedData,
    };

    const updatedProfile = await prisma.profile.update({
      where: { id: user.profile.id },
      data: {
        education: educations as any,
      },
    });

    return NextResponse.json(updatedProfile.education[educatioinIndex]);
  } catch (error) {
    console.error("Error updating education:", error);
    return NextResponse.json(
      { error: "Failed to update education" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { educationId: string } },
) {
  try {
    const session = await getSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { educationId } = params;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    if (!user || !user.profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const educations =
      (user.profile.education as Array<{
        id: string;
        [key: string]: any;
      }>) || [];

    const educatioinIndex = educations.findIndex(
      (exp) => exp.id === educationId,
    );

    if (educatioinIndex === -1) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 },
      );
    }


    educations.splice(educatioinIndex, 1);


    const updatedProfile = await prisma.profile.update({
      where: { id: user.profile.id },
      data: {
        education: educations as any,
      },
    });

    return NextResponse.json({ message: "education deleted successfully" });
  } catch (error) {
    console.error("Error deleting education:", error);
    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 },
    );
  }
}
