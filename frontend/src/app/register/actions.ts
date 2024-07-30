import { SERVER_API_URL } from "@/lib/config/const";
import { IResponse } from "@/lib/interfaces";
import axios from "axios";

export const handleRegister = async (
  router: any,
  toast: any,
  // setCookie: any,
  {
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
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
        title: "Account created successfully",
      });
      router.push("/otp");
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
