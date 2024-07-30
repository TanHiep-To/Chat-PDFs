"use client";

import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_API_URL } from "@/lib/config/const";
import { UserContext } from "@/context/UserContext";
import UserItem from "../UserItem";
import { IUser } from "@/lib/interfaces";

export default function Admin() {
  const { token, user } = useContext(UserContext);

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`${SERVER_API_URL}/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    },
  });

  return (
    <div className="space-y-8">
      {users?.map((user: IUser) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}
