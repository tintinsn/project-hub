import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import prisma from "../libs/prismadb";

export const getSession = async () => {
  return await getServerSession(authOption);
};

const deleteProject = async (projectId: string) => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const project = await prisma.project.delete({
      where: { id: projectId },
    });

    if (!project) return null;

    return project;
  } catch (error) {
    console.error("Failed to delete project", error);
    return null;
  }
};

export default deleteProject;
