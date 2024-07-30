import { cookies } from "next/headers";
import React from "react";
import { IUser } from "@/lib/interfaces";
import { ChatContextProvider } from "@/context/ChatContext";
import { getProfile } from "../actions";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    fileId: string;
  };
}>) {
  const cookieStore = cookies();

  const { fileId } = params;

  const token = cookieStore.get("token")?.value || "";
  let user: Partial<IUser>;
  if (token) {
    user = await getProfile(token);
  } else {
    user = {};
  }
  return (
    <ChatContextProvider token={token} fileId={fileId}>
      {children}
    </ChatContextProvider>
  );
}
