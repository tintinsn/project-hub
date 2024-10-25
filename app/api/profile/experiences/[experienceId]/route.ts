import authOptions from "@/app/libs/auth";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

 const getSession = async () => {
  return await getServerSession(authOptions);
};

export async function PUT(
  request: NextRequest,
  { params }: { params: { experienceId: string } },
) {
  try {
    const { experienceId } = params;
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

    const experiences =
      (user.profile.experience as Array<{
        id: string;
        [key: string]: any;
      }>) || [];

    const experienceIndex = experiences.findIndex(
      (exp) => exp.id === experienceId,
    );

    if (experienceIndex === -1) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 },
      );
    }

    // Update the experience
    experiences[experienceIndex] = {
      ...experiences[experienceIndex],
      ...updatedData,
    };

    // Update the profile with the modified experiences array
    const updatedProfile = await prisma.profile.update({
      where: { id: user.profile.id },
      data: {
        experience: experiences as any,
      },
    });

    return NextResponse.json(updatedProfile.experience[experienceIndex]);
  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { experienceId: string } },
) {
  try {
    const session = await getSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { experienceId } = params;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    if (!user || !user.profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const experiences =
      (user.profile.experience as Array<{
        id: string;
        [key: string]: any;
      }>) || [];

    const experienceIndex = experiences.findIndex(
      (exp) => exp.id === experienceId,
    );

    if (experienceIndex === -1) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 },
      );
    }

    // Remove the experience from the array
    experiences.splice(experienceIndex, 1);

    // Update the profile with the modified experiences array
    const updatedProfile = await prisma.profile.update({
      where: { id: user.profile.id },
      data: {
        experience: experiences as any,
      },
    });

    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 },
    );
  }
}
