import { SERVER_API_URL } from "@/lib/config/const";
import { IResponse } from "@/lib/interfaces";
import axios from "axios";

export const handleOTP = async (
  router: any,
  toast: any,
  { otp }: { otp: string }
) => {
  try {
    const response = await axios.post(`${SERVER_API_URL}/auth/otp`, {
      otp,
    });
    const data: IResponse = response.data;
    if (data.success == true) {
      toast({
        variant: "success",
        title: data.message,
      });
      router.push("/login");
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

export const handleResendOTP = async () => {
  try {
    console.log("Resend OTP");
  } catch (error) {
    console.log(error);
  }
};
