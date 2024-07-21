"use client";

import Link from "next/link";
import { LogInIcon, Rocket } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import UserAccountDropdown from "./AvatarDropdown";

import WrapWidth from "@/components/ui/WrapWidth";

import { buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = async ({
  cookieStore,
  setCookie,
  deleteCookie,
  user,
}: {
  cookieStore: any;
  setCookie: any;
  deleteCookie: any;
  user: any;
}) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    // get token
    const token = cookieStore[0].find(
      (cookie: any) => cookie.name == "token"
    ).value;
    if (!token) {
      router.push("/login");
    }
    setToken(token);
  });

  return (
    <nav className="sticky inset-x-0 top-0 z-50 h-14 w-full border-b border-gray-200 bg-white/75 pr-4 backdrop-blur-lg transition-all">
      <WrapWidth>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link
            href="/"
            className="z-60 ml-4 flex items-center gap-1 font-semibold"
          >
            <Rocket className="h-6 w-6" />
            pdfwhisper.
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
              {token ? (
                <UserAccountDropdown user={user} deleteCookie={deleteCookie} />
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
