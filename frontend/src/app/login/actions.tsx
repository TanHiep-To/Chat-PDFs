import { useToast } from "@/components/ui/use-toast";
import { SERVER_API_URL } from "@/lib/config/const";
import { IResponse, IToast } from "@/lib/interfaces";
import axios from "axios";
import { setCookie } from "cookies-next";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleLogin = async (
  toast: IToast,
  router: AppRouterInstance,
  { email, password }: { email: string; password: string }
) => {
  try {
    const response = await axios.post(`${SERVER_API_URL}/auth/login`, {
      email,
      password,
    });
    const data: IResponse = response.data;
    if (data.success == true) {
      setCookie("token", data.data.token, {
        maxAge: 30 * 24 * 60 * 60,
      });
      toast({
        variant: "success",
        title: "Login successfully",
        description: data.message,
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: data.message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
