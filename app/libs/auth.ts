import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { generateSlug } from "@/utils/generateSlug";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // Check ว่า user ได้กรอกข้อมูลมามั้ย
        if (!credentials?.email && !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      try {
        const slug = generateSlug(user.name || "user", user.id);

        await prisma.profile.create({
          data: {
            userId: user.id,
            slug,
            jobTitle: "Developer",
            bio: `Hi, I'm ${user.name || "there"}!`,
            githubLink: "https://github.com/",
            linkedinLink: "https://www.linkedin.com/",
            phoneNumber: "",
            email: "",
            address: "",
            technicalSkills: [],
            tools: [],
            education: [],
            experience: [],
          },
        });
      } catch (error) {
        console.error("Error creating profile after OAuth signup:", error);
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
