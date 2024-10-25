"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./navbar/navbar";

interface NavContainerProps {
  user: any;
  slug: string;
}
const NavContainer = ({ user, slug }: NavContainerProps) => {
  const pathname = usePathname();
  const isProfilePage = pathname?.includes("/profile/");
  if (isProfilePage) {
    return null;
  }

  return <Navbar user={user} slug={slug} />;
};

export default NavContainer;
