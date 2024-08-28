import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    const {
      title,
      description,
      technologies,
      imageUrl,
      projectUrl,
      githubRepoUrl,
      userId,
    } = body;

    const newProject = await prisma.project.create({
      data: {
        title,
        imageUrl,
        description,
        technologies,
        projectUrl,
        githubRepoUrl,
        userId,
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
