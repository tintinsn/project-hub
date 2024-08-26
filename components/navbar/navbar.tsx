"use client";
import { User } from "@prisma/client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaHubspot } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import Avatar from "../ui/avatar";
import Container from "../ui/container";
import LinkButton from "../ui/link-button";
import MobileNavButton from "../ui/mobile-nav-button";
import ToggleThemeButton from "../ui/ToggleThemeButton";
import MenuList from "./menu-list";
import { AiOutlineUser } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  user?: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const toggleNavRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

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
    // Clear the checkbox status when the pathname changes
    if (toggleNavRef.current) {
      toggleNavRef.current.checked = false;
    }
  }, [pathname]);

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
            <LinkButton href="/create" label="Create Project" rounded="full" />
            {user ? (
              <label htmlFor="toggle_nav" className="cursor-pointer">
                <Avatar imageUrl={user?.image} />
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
                  href="/profile"
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
              <MenuList label="Home" href="/explore" icon={GoHome} />
              {user && (
                <MenuList
                  onClick={() => signOut()}
                  label="Log out"
                  icon={MdLogout}
                />
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

// const loginModal = useLoginModal();
// const registerModal = useRegisterModal()

{
  /* <Button
                onClick={loginModal.onOpen}
                
                label="Log in"
                position="center"
                size="lg"
              />
              <Button
                onClick={registerModal.onOpen}
                
                label="Sign up"
                position="center"
                size="lg"
                variant="outline"
              /> */
}
