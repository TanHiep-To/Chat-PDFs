import React, { useContext, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { ChatContext } from "@/context/ChatContext";

export default function PDFTextDropdown({
  menuOpen,
  selectedText,
  xCoordination,
  yCoordination,
}: {
  menuOpen: boolean;
  selectedText: string;
  xCoordination: number;
  yCoordination: number;
}) {
  const { addMessage } = useContext(ChatContext);
  useEffect(() => {}, [xCoordination, yCoordination]);

  const handleClick = () => {
    addMessage(`Explain this for me: ${selectedText}`);
  };
  return (
    <div
      className={
        menuOpen && xCoordination && yCoordination
          ? "flex fixed z-10"
          : `hidden`
      }
      style={{
        left: `${xCoordination}px`,
        top: `${yCoordination}px`,
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* <Avatar className="h-10 w-10 sm:h-7 sm:w-7">
          <span className="sr-only">User Profile Icon</span>
          <div className="relative flex aspect-square h-full w-full">
            <User2 className="relative h-6 w-6" />
          </div>
        </Avatar> */}
          <Button
            variant="outline"
            // className={`absolute bg-blue l-[${xCoordination}px] t-[${yCoordination}px] z-10`}
          >
            <DotsHorizontalIcon className="h-3 w-3" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          // className={`absolute bg-blue l-[${xCoordination}px] t-[${yCoordination}px] z-10`}
          align="end"
        >
          <DropdownMenuItem className="cursor-pointer" onClick={handleClick}>
            Explain
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem asChild className="cursor-pointer">
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
          <LogoutButton className="w-full" />
        </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
