import RegisterModal from "@/components/modal/register-modal";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import "./globals.css";
import ToasterProvider from "./providers/toaster-provider";
import LoginModal from "@/components/modal/login-modal";
import getUser from "./actions/get-user";
import Navbar from "@/components/navbar/navbar";

// const inter = Inter({ subsets: ["latin"] });
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
        {/* <LoginModal />
        <RegisterModal /> */}
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
