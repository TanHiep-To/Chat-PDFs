import Login from "@/components/Login";
import React from "react";
import { cookies } from "next/headers";
import { getCookie, setCookie } from "../actions";
export default function page() {
  const cookieStore = cookies();
  // const setCookie = (name: string, value: any, options: any) => {
  //   const cookieString = `${name}=${value}; path=/`;

  //   if (options.expires) {
  //     cookieString.concat(`;expires=${options.expires.toUTCString()}`);
  //   }

  //   cookieStore.set("Cookie", cookieString);
  // };

  return (
    <main className="flex flex-col p-4">
      <Login cookieStore={cookieStore} setCookie={setCookie} />
    </main>
  );
}
