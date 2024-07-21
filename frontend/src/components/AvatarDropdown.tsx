"use client";

import { User2 } from "lucide-react";
import Link from "next/link";

import LogoutButton from "./LogoutButton";

// import UserAvatar from "../UserIcon/UserIcon";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";

const UserAccountDropdown = ({
  user,
  deleteCookie,
}: {
  user: any;
  deleteCookie: any;
}) => {
  const { email } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-10 w-10 sm:h-7 sm:w-7">
          {/* for screenreaders */}
          <span className="sr-only">User Profile Icon</span>
          <div className="relative flex aspect-square h-full w-full">
            <User2 className="relative h-6 w-6" />
          </div>
        </Avatar>
        {/* <UserAvatar className="h-10 w-10 sm:h-7 sm:w-7" /> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {email && (
              <p className="w-[200px] truncate text-sm text-zinc-700 dark:text-zinc-300">
                {email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/pricing">Pricing</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <LogoutButton className="w-full" deleteCookie={deleteCookie} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountDropdown;
