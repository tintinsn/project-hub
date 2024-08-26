import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import prisma from "../libs/prismadb";

export const getSession = async () => {
  return await getServerSession(authOption);
};

const getProject = async (projectId: string) => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

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
