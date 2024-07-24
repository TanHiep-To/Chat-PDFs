"use client";

import { IUser } from "@/lib/interfaces";
import { createContext } from "react";

interface UserContextType {
  token: string;
  user?: any;
  setCookie: (name: string, value: any) => void;
  deleteCookie: (name: string) => void;
}

const initialUser: UserContextType = {
  token: "",
  user: {},
  setCookie: (name: string, value: any) => {},
  deleteCookie: (name: string) => {},
};

export const UserContext = createContext<UserContextType>(initialUser);

export const UserProvider = ({
  children,
  token,
  user,
  // setUser,
  setCookie,
  deleteCookie,
}: {
  children: React.ReactNode;
  token: string;
  user: Partial<IUser>;
  // setUserData: Dispatch<SetStateAction<UserDataContextType>>;
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
