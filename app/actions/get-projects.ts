import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import prisma from "../libs/prismadb";

export const getSession = async () => {
  return await getServerSession(authOption);
};

const getProjects = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const projects = await prisma.project.findMany({
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

    if (!projects) return null;

    return projects;
  } catch (error) {
    return null;
  }
};

export default getProjects;
