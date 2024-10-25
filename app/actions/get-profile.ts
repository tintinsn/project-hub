import prisma from "../libs/prismadb";

const getProfile = async (slug: string) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        projects: {
          include: {
            createdBy: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                profile: {
                  select: {
                    slug: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!profile) {
      
      return null;
    }

    return profile;
  } catch (error) {
    console.error("Failed to fetch profile", error);
    return null;
  }
};

export default getProfile;
