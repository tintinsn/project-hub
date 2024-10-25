import { getServerSession } from "next-auth";

import prisma from "../libs/prismadb";
import authOptions from "../libs/auth";

export const getSession = async () => {
  return await getServerSession(authOptions);
};

const getProjects = async () => {
  try {

    const projects = await prisma.project.findMany({
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

    if (!projects) return null;

    return projects;
  } catch (error) {
    return null;
  }
};

export default getProjects;
