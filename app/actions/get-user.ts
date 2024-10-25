import { getServerSession } from "next-auth";

import prisma from "../libs/prismadb";
import authOptions from "../libs/auth";

export const getSession = async () => {
  return await getServerSession(authOptions);
};

const getUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        profile: {
          select: {
            slug: true,
          },
        },
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (error) {
    return null;
  }
};

export default getUser;
