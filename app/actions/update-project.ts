import { getServerSession } from "next-auth";

import prisma from "../libs/prismadb";
import authOptions from "../libs/auth";

export const getSession = async () => {
  return await getServerSession(authOptions);
};

const updateProject = async (projectId: string, updatedData: any) => {
  console.log("update data =>" + updatedData);
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
