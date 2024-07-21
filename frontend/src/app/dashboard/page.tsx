import Navbar from "@/components/NavBar";
import { cookies } from "next/headers";
import React from "react";
import { deleteCookie, setCookie } from "../actions";
// import { useRouter } from "next/router";
import { getFiles, getProfile } from "./actions";

export default async function page() {
  const cookieStore = cookies();
  const token: string = (cookieStore.get("token") as unknown as string) || "";
  // const router = useRouter();
  // if (!token) {
  //   router.push("/login");
  // }

  const user = await getProfile(token);

  const data = await getFiles(token);
  // if (!data) {
  //   router.push("/not-found");
  // }

  //TODO: get files
  // const files = data.files;

  return (
    <div className="flex flex-col ">
      <Navbar
        cookieStore={cookieStore}
        setCookie={setCookie}
        deleteCookie={deleteCookie}
        user={user}
      />
    </div>
  );
}
