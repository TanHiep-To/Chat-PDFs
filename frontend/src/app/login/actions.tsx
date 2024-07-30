import { toast } from "@/hooks/use-toast";
import { SERVER_API_URL } from "@/lib/config/const";
import { IResponse } from "@/lib/interfaces";
import axios from "axios";

export const handleLogin = async (
  router: any,
  setCookie: any,
  toast: any,
  { email, password }: { email: string; password: string }
) => {
  try {
    const response = await axios.post(`${SERVER_API_URL}/auth/login`, {
      email,
      password,
    });
    const data: IResponse = response.data;
    console.log("data", data);
    if (data.success == true) {
      setCookie("token", data.data.token);
      toast({
        variant: "success",
        title: data.message,
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "error",
        title: data.message,
      });
    }
  } catch (error: any) {
    toast({
      variant: "error",
      title: error.response.data.message,
    });
  }
};
