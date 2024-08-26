import deleteProject from "@/app/actions/delete-project";
import getProject from "@/app/actions/get-project";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("id");

  if (!projectId) {
    return NextResponse.json(
      { error: "Project ID is required" },
      { status: 400 },
    );
  }

  const project = await getProject(projectId);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function DELETE(
  request: Request,
  { params }: { params: { projectId: string } },
) {
  try {
    const projectId = params.projectId;
    const deletedProject = await deleteProject(projectId);

    if (deletedProject) {
      return NextResponse.json(
        { message: "Project deleted successfully" },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "Failed to delete project" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error in DELETE project route:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
