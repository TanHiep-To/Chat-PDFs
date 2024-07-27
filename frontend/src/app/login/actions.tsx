import { SERVER_API_URL } from "@/lib/config/const";
import { IResponse } from "@/lib/interfaces";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirect } from "next/navigation";

export const handleLogin = async (
  setCookie: any,
  { email, password }: { email: string; password: string }
) => {
  try {
    const response = await axios.post(`${SERVER_API_URL}/auth/login`, {
      email,
      password,
    });
    const data: IResponse = response.data;
    if (data.success == true) {
      setCookie("token", data.data.token);
      console.log("login success");
      redirect("/dashboard");
    } else {
      console.log("login failed");
    }
  } catch (error) {
    console.log(error);
  }
};
