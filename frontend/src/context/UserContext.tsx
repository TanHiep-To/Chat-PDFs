"use client";

import { IUser } from "@/lib/interfaces";
import { createContext } from "react";

interface UserContextType {
  user?: any;
  setCookie: (name: string, value: any) => void;
  deleteCookie: (name: string) => void;
}

const initialUser: UserContextType = {
  user: {},
  setCookie: (name: string, value: any) => {},
  deleteCookie: (name: string) => {},
};

export const UserContext = createContext<UserContextType>(initialUser);

export const UserProvider = ({
  children,
  user,
  // setUser,
  setCookie,
  deleteCookie,
}: {
  children: React.ReactNode;
  user: Partial<IUser>;
  // setUserData: Dispatch<SetStateAction<UserDataContextType>>;
  setCookie: (name: string, value: any) => void;
  deleteCookie: (name: string) => void;
}) => {
  return (
    <UserContext.Provider
      value={{ ...initialUser, user, setCookie, deleteCookie }}
    >
      {children}
    </UserContext.Provider>
  );
};
