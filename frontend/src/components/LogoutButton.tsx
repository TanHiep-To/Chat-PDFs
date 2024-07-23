import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { Button, buttonVariants } from "./ui/button";
import { UserContext } from "@/context/UserContext";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const { deleteCookie } = useContext(UserContext);
  const logout = async () => {
    try {
      console.log("logging out");
      deleteCookie("token");
      // router.push("/login");
      router.refresh();
      return;
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <Button
      className={buttonVariants({
        variant: "default",
        className,
      })}
      onClick={logout}
    >
      Logout
    </Button>
  );
}
