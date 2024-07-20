import { SERVER_API_URL } from "@/lib/config/const";
import { IResponse, IToast } from "@/lib/interfaces";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleRegister = async (
  toast: IToast,
  router: AppRouterInstance,
  {
    firstName,
    lastName,
    email,
    password,
  }: { firstName: string; lastName: string; email: string; password: string }
) => {
  try {
    const name = `${firstName} ${lastName}`;
    const response = await axios.post(`${SERVER_API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    const data: IResponse = response.data;
    if (data.success == true) {
      toast({
        variant: "success",
        title: "Register successfully",
        description: data.message,
      });
      router.push("/login");
    } else {
      toast({
        variant: "destructive",
        title: "Register failed",
        description: data.message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
