"use client";

import Link from "next/link";
import { LogInIcon, Sprout } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import UserAccountDropdown from "./AvatarDropdown";

import WrapWidth from "@/components/WrapWidth";

import { buttonVariants } from "./ui/button";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
// import { UserContext } from "@/context/UserContext";

const Navbar = () => {
  const router = useRouter();
  const { token, user } = useContext(UserContext);
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  });

  return (
    <nav className="sticky inset-x-0 top-0 z-50 h-14 w-full border-b border-gray-200 bg-white/75 pr-4 backdrop-blur-lg transition-all">
      <WrapWidth>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link
            href="/"
            className="z-60 ml-4 flex items-center gap-1 font-semibold"
          >
            <Sprout className="h-6 w-6" />
            Chat PDF
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <a
                href="https://github.com/TanHiep-To/Chat-PDFs"
                target="_blank"
                rel="noopener"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                })}
              >
                <FaGithub className="h-5 w-5" />
                <span className="ml-[2px] font-medium">GitHub</span>
              </a>
              <Link
                href="/pricing"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Pricing
              </Link>
              {user ? (
                <UserAccountDropdown />
              ) : (
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: "default",
                    size: "sm",
                  })}
                >
                  Login
                  <LogInIcon className="ml-px h-5 w-5" />
                </Link>
              )}
            </>
          </div>
        </div>
      </WrapWidth>
    </nav>
  );
};

export default Navbar;
