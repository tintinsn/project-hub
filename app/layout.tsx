import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import Navbar from "@/components/navbar/navbar";
import getUser from "./actions/get-user";
import "./globals.css";
import ToasterProvider from "./providers/toaster-provider";

const urbanist = Urbanist({ subsets: ["latin"] });
// const font = GeistSans({ subsets: ["latin"] });

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
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
