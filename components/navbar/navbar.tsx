"use client";

import useCreateProjectModal from "@/app/hooks/useCreateProjectModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaHubspot } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import Avatar from "../ui/avatar";
import Button from "../ui/button";
import Container from "../ui/container";
import LinkButton from "../ui/link-button";
import MobileNavButton from "../ui/mobile-nav-button";
import ToggleThemeButton from "../ui/ToggleThemeButton";
import MenuList from "./menu-list";

interface NavbarProps {
  user?: User | null;
  slug: string;
}

const Navbar = ({ user, slug }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const toggleNavRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const createProjectModal = useCreateProjectModal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (toggleNavRef.current) {
      toggleNavRef.current.checked = false;
    }
  }, [pathname]);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/signin" });
  };
  const handleCreateProjectClick = () => {
    if (!user) {
      router.push("/signin");
    } else {
      createProjectModal.onOpen();
    }
  };

  return (
    <nav
      className={`sticky top-0 z-40 bg-white ${scrolled ? "bg-white/30 shadow-sm backdrop-blur-lg" : ""}`}
    >
      <Container>
        <div className="flex h-24 w-full items-center justify-between px-4 sm:px-6 lg:relative lg:px-8">
          <input
            type="checkbox"
            name="toggle_nav"
            id="toggle_nav"
            className="peer hidden"
            ref={toggleNavRef}
          />

          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-x-2">
              <FaHubspot className="fill-blue-950 text-2xl" />
              <span className="text-2xl font-bold">Hub</span>
            </Link>
          </div>

          {/* Nav Menu right */}
          <div className="relative flex gap-6">
            <Button
              onClick={handleCreateProjectClick}
              label="Create Project"
              rounded="full"
              bg="black"
            />
            {user ? (
              <label htmlFor="toggle_nav" className="cursor-pointer">
                <Avatar size="lg" imageUrl={user?.image} />
              </label>
            ) : (
              <MobileNavButton />
            )}
          </div>

          {/* Dropdown start */}
          <div className="invisible absolute right-4 top-full mt-2 min-h-full w-9/12 rounded-xl border border-gray-200 bg-white shadow-sm peer-checked:visible lg:right-6 lg:w-3/12">
            <div className="space-y-3 p-5">
              {user ? (
                <MenuList
                  label={user.name || ""}
                  href={`/profile/${slug}`}
                  icon={AiOutlineUser}
                />
              ) : (
                <>
                  <LinkButton
                    href="/signin"
                    label="Log in"
                    variant="outline"
                    position="center"
                    size="lg"
                    width="full"
                  />
                  <LinkButton
                    href="/signup"
                    label="Sign up"
                    position="center"
                    size="lg"
                    width="full"
                  />
                </>
              )}
            </div>
            <hr />
            <div className="flex justify-between p-5">
              <MenuList label="Theme" href="/explore" />
              <ToggleThemeButton />
            </div>
            <hr />
            <div className="space-y-2 p-5">
              <MenuList
                label="Explore"
                href="/explore"
                icon={HiOutlineViewGridAdd}
              />
              <MenuList label="Home" href="/" icon={GoHome} />
              {user && (
                <>
                  <MenuList
                    onClick={handleSignOut}
                    label="Log out"
                    icon={MdLogout}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        {/* Dropdown end */}
      </Container>
    </nav>
  );
};

export default Navbar;
