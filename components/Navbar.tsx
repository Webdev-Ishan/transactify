"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import SignOut from "./Signout";
import { useRouter } from "next/navigation";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-white dark:text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  return (
    <div className={cn("fixed top-3 inset-x-0 w-full z-50", className)}>
      <nav className="flex items-center border border-white hover:shadow hover:shadow-blue-500  transition duration-300 justify-between w-[98%]  mr-4 ml-2  px-4 md:px-8 bg-white rounded-4xl dark:bg-black shadow ">
        <div className="flex items-center">
          <h1
            onClick={() => router.push("/")}
            className="text-blue-500 cursor-pointer text-xl font-sans md:text-lg font-bold"
          >
            Transactify
          </h1>
        </div>
        {/* Hamburger button for mobile */}
        <button
          className="md:hidden p-2  rounded focus:outline-none"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-white dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-evenly">
          <Menu setActive={setActive}>
            <MenuItem
              setActive={setActive}
              active={active}
              onclick={() => router.push("/TransactionList")}
              className="text-white text-xs"
              item="Transaction"
            ></MenuItem>
            <MenuItem
              setActive={setActive}
              active={active}
              className="text-white text-xs"
              onclick={() => router.push("/Profile")}
              item="Profile"
            ></MenuItem>
            <MenuItem
              setActive={setActive}
              active={active}
              onclick={() => router.push("/Contact")}
              className="text-white text-xs"
              item="Contact"
            ></MenuItem>
            <MenuItem
              setActive={setActive}
              active={active}
              onclick={() => router.push("/FAQ")}
              className="text-white text-xs"
              item="FAQs"
            ></MenuItem>
            <MenuItem
              className="text-green-400 text-xs "
              setActive={setActive}
              active={active}
              onclick={() => {
                router.push("/About");
              }}
              item="About Us"
            ></MenuItem>
            <SignOut />
          </Menu>
        </div>
      </nav>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-black shadow px-4 py-2">
          <div className="flex flex-col space-y-2">
            <HoveredLink onClick={() => router.push("/")}>
              Transactify
            </HoveredLink>
            <HoveredLink onClick={() => router.push("/Profile")}>
              Profile
            </HoveredLink>
            <HoveredLink onClick={() => router.push("/TransactionList")}>
              Transaction
            </HoveredLink>
            <HoveredLink onClick={() => router.push("/Contact")}>
              Contact Us
            </HoveredLink>
            <HoveredLink onClick={() => router.push("/FAQ")}>
              Frequently Asked Questions
            </HoveredLink>
            <HoveredLink onClick={() => router.push("/About")}>
              About Us
            </HoveredLink>
            <HoveredLink onClick={() => router.push("/signin")}>
              Sign In
            </HoveredLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
