"use client";

import Link from "next/link";
import { IconType } from "react-icons";

interface MenuList {
  onClick?: () => void;
  label: string;
  href?: string;
  icon?: IconType;
}

const MenuList = ({ label, href = "/", icon: Icon, onClick }: MenuList) => {
  return (
    <Link
      onClick={onClick}
      href={href}
      className="flex cursor-pointer items-center gap-3 rounded-lg py-3 pl-2 text-[#666666] hover:bg-[#F2F2F2] hover:text-[#171717]"
    >
      {Icon && <Icon size={16} />}
      <span className="text-lg tracking-wide lg:text-sm">{label}</span>
    </Link>
  );
};

export default MenuList;
