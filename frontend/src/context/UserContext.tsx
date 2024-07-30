"use client";

import { IUser } from "@/lib/interfaces";
import { createContext } from "react";

interface UserContextType {
  token: string;
  user?: any;
  setCookie: (name: string, value: any) => void;
  deleteCookie: (name: string) => void;
  // toast: any;
}

const initialUser: UserContextType = {
  token: "",
  user: {},
  setCookie: (name: string, value: any) => {},
  deleteCookie: (name: string) => {},
  // toast: {},
};

export const UserContext = createContext<UserContextType>(initialUser);

export const UserProvider = ({
  children,
  token,
  user,
  setCookie,
  deleteCookie,
}: {
  children: React.ReactNode;
  token: string;
  user: Partial<IUser>;
  setCookie: (name: string, value: any) => void;
  deleteCookie: (name: string) => void;
}) => {
  return (
    <UserContext.Provider
      value={{ ...initialUser, token, user, setCookie, deleteCookie }}
    >
      {children}
    </UserContext.Provider>
  );
};
