import { useRouter } from "next/navigation";
import React from "react";
import { Button, buttonVariants } from "./ui/button";

export default function LogoutButton({
  className,
  deleteCookie,
}: {
  className?: string;
  deleteCookie: any;
}) {
  const router = useRouter();

  const logout = async () => {
    try {
      deleteCookie("token");
      router.push("/login");
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
