import { getServerSession } from "next-auth";

import prisma from "../libs/prismadb";
import authOptions from "../libs/auth";

export const getSession = async () => {
  return await getServerSession(authOptions);
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
