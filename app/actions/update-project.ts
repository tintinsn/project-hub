import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import prisma from "../libs/prismadb";

export const getSession = async () => {
  return await getServerSession(authOption);
};

const updateProject = async (projectId: string, updatedData: any) => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const project = await prisma.project.update({
      where: { id: projectId },
      data: updatedData,
    });

    return project;
  } catch (error) {
    console.error("Failed to update project", error);
    return null;
  }
};

export default updateProject;
