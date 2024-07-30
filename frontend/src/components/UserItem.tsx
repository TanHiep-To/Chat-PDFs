import React, { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User2 } from "lucide-react";
import { IUser } from "@/lib/interfaces";
import { UserContext } from "@/context/UserContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_API_URL } from "@/lib/config/const";

export default function UserItem({ user }: { user: IUser }) {
  const { token } = useContext(UserContext);

  const { data: files } = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const response = await axios.get(
        `${SERVER_API_URL}/files/list/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    },
  });

  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <div className="relative flex aspect-square h-full w-full">
          <User2 className="relative h-[50px] w-[50px]" />
        </div>
      </Avatar>

      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">
          {user ? user.name : ""}
        </p>
        <p className="text-sm text-muted-foreground">
          {user ? user.email : ""}
        </p>
      </div>

      <div className="ml-auto font-medium">{files ? files.length : 0}</div>
      <div className="ml-auto font-medium">{user ? user.role : ""}</div>
    </div>
  );
}
