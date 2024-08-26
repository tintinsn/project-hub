import { getServerSession } from "next-auth";

import prisma from "../libs/prismadb";
import authOptions from "../libs/auth";
export const getSession = async () => {
  return await getServerSession(authOptions);
};

const getProject = async (projectId: string) => {
  try {
    // const session = await getSession();

    // if (!session?.user?.email) return null;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!project) return null;

    return project;
  } catch (error) {
    console.error("Failed to fetch project", error);
    return null;
  }
};

export default getProject;
