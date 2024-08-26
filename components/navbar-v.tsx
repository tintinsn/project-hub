"use client";
import ToggleThemeButton from "@/components/ui/ToggleThemeButton";
import Container from "@/components/ui/container";
import Link from "next/link";
import { FaHubspot } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import MobileNavButton from "./ui/mobile-nav-button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface NavbarProps {
  user?: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  console.log({ user });
  return (
    <nav>
      <Container>
        <div className="fixed z-40 flex h-24 w-full items-center bg-white px-4 sm:px-6 lg:relative lg:px-8">
          <div className="flex w-full justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-x-2">
              <FaHubspot className="fill-blue-950 text-2xl" />
              <span className="text-2xl font-bold">Hub</span>
            </Link>

            {/* Dropdown and Navbar List */}
            <div className="lg:flex lg:w-7/12">
              <input
                type="checkbox"
                name="toggle_nav"
                id="toggle_nav"
                className="peer hidden"
              />

              {/* Overlay backdrop */}
              <div className="absolute left-0 top-full z-10 hidden h-screen w-full bg-white/30 backdrop-blur-lg peer-checked:flex lg:relative lg:top-0 lg:flex lg:h-full">
                {/* Navbar Mobile */}
                <div className="boder-b-2 absolute w-full rounded-2xl border-gray-500 bg-white px-10 py-5 shadow-sm lg:relative lg:h-full lg:border-none lg:py-0 lg:shadow-none">
                  <div className="py-5 lg:flex lg:items-center lg:justify-end lg:py-0">
                    {/* Navbar List */}
                    <ul className="space-y-3 lg:flex lg:gap-10 lg:space-y-0">
                      {user ? (
                        <li className="lg:order-3">
                          <button
                            onClick={() => signOut()}
                            className="flex w-full items-center justify-center rounded-md border bg-white px-5 py-3 text-black lg:h-full lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
                          >
                            <span className="text-lg font-medium lg:text-base">
                              Log out
                            </span>
                          </button>
                        </li>
                      ) : (
                        <>
                          <li className="lg:order-3">
                            <button
                              onClick={loginModal.onOpen}
                              className="flex w-full items-center justify-center rounded-md border bg-white px-5 py-3 text-black lg:h-full lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
                            >
                              <span className="text-lg font-medium lg:text-base">
                                Log in
                              </span>
                            </button>
                          </li>
                          <li className="lg:order-4">
                            <button
                              onClick={registerModal.onOpen}
                              className="lg: flex w-full items-center justify-center rounded-md border border-black bg-black px-5 py-3 text-white lg:py-2"
                            >
                              <span className="text-lg font-medium lg:text-base">
                                Sign up
                              </span>
                            </button>
                          </li>
                        </>
                      )}
                      <li className="cursor-pointer rounded-lg border border-white p-3 text-[#666666] hover:bg-[#F2F2F2] hover:text-[#171717] lg:order-1 lg:flex lg:items-center lg:border-0 lg:p-0 lg:hover:bg-transparent">
                        <Link href="/">
                          <span className="text-lg tracking-wide lg:text-base">
                            Home
                          </span>
                        </Link>
                      </li>
                      <li className="cursor-pointer rounded-lg border border-white p-3 text-[#666666] hover:bg-[#F2F2F2] hover:text-[#171717] lg:order-2 lg:flex lg:items-center lg:border-0 lg:p-0 lg:hover:bg-transparent">
                        <Link href="/create">
                          <span className="flex items-center justify-between text-lg tracking-wide lg:text-base">
                            Create Project
                            <FiPlusCircle className="h-6 w-6 lg:hidden" />
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Profile , Theme Mode , hamburger*/}
              <div className="flex items-center space-x-5 lg:space-x-0 lg:border-l lg:pl-7">
                {/* Profile */}
                <div className="relative h-9 w-9 rounded-full bg-gray-200">
                  <Image
                    src={user?.image || ""}
                    alt="avatar"
                    className="w-full rounded-full"
                    fill
                  />
                </div>
                {/* Theme Mode */}
                <ToggleThemeButton />
                {/* Hamburger button sign */}
                <MobileNavButton />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
