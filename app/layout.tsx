import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import getUser from "./actions/get-user";
import "./globals.css";
import ToasterProvider from "./providers/toaster-provider";
import CreateProjectModal from "@/components/modal/create-project-modal";
import { headers } from "next/headers";
import NavContainer from "@/components/NavContainer";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProjectHub",
  description: "Showcase Your Projects",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={urbanist.className}>
        <ToasterProvider />
        <NavContainer user={user} slug={user?.profile?.slug || ""} />
        {/* {!isProfilePage && (
          <Navbar user={user} slug={user?.profile?.slug || ""} />
        )} */}
        {children}
        <CreateProjectModal user={user} />
      </body>
    </html>
  );
}
