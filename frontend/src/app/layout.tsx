import Providers from "@/context/ClientProvider";
import { cookies } from "next/headers";
import "./globals.css";
import React from "react";
import { UserProvider } from "@/context/UserContext";
import { redirect } from "next/navigation";
import { getProfile } from "./dashboard/actions";
import { deleteCookie, setCookie } from "./actions";
import { IUser } from "@/lib/interfaces";

// const UserProvider = React.lazy(() => import("@/context/UserContext"));
// const UserContext = React.lazy(() => import("@/context/UserContext"));
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value || "";
  let user: Partial<IUser>;
  if (token) {
    user = await getProfile(token);
  } else {
    user = {};
  }
  return (
    <html lang="en">
      <Providers>
        <UserProvider
          token={token}
          user={user}
          setCookie={setCookie}
          deleteCookie={deleteCookie}
        >
          <body>{children}</body>
        </UserProvider>
        {/* <UserContext.Provider value={{ cookieStore }}>
          <body>{children}</body>
        </UserContext.Provider> */}
      </Providers>
    </html>
  );
}
