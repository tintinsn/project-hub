"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNavButton = () => {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const onOpen = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);
  return (
    <div className="flex items-center">
      <label
        onClick={onOpen}
        role="button"
        htmlFor="toggle_nav"
        aria-label="hamburger"
        id="hamburger"
        className="relative px-2"
      >
        <div
          aria-hidden="true"
          id="line"
          className={`m-auto h-0.5 w-6 rounded bg-gray-600 transition duration-300 ${
            isNavOpen ? "translate-y-1.5 rotate-45" : "translate-y-0 rotate-0"
          } `}
        ></div>
        <div
          aria-hidden="true"
          id="line2"
          className={`m-auto mt-2 h-0.5 w-6 rounded bg-gray-600 transition duration-300 ${isNavOpen ? "-translate-y-1 -rotate-45" : "translate-y-0 rotate-0"}`}
        ></div>
      </label>
    </div>
  );
};

export default MobileNavButton;

