"use server";

import { cookies } from "next/headers";
export const setCookie = async (name: string = "token", value: any) => {
  cookies().set(name, value, {
    expires: new Date(Date.now() + 86400000), // 1 day
  });
};

export const getCookie = async (name: string) => {
  const cookieStore = cookies();
  return cookieStore.get(name)?.value;
};

export const deleteCookie = async (name: string = "token") => {
  cookies().delete(name);
};
