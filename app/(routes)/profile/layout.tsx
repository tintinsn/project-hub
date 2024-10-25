import { Urbanist } from "next/font/google";
import "../../globals.css";
import { Metadata } from "next";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Profile",
  description: "User profile page",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`${urbanist.className} `}>{children}</div>;
}
