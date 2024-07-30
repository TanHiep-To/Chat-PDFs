import { SERVER_API_URL } from "@/lib/config/const";
import axios from "axios";

interface IProfileData {
  name: string;
  // bio: string;
  oldPassword: string;
  newPassword: string;
}

export const handleProfileSave = async (
  token: string,
  setCookie: (key: string, value: string) => void,
  toast: any,
  payload: IProfileData
) => {
  try {
    const { data } = await axios.put(`${SERVER_API_URL}/users/me`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      toast({
        variant: "success",
        title: "Success",
        description: "Profile updated successfully",
      });
      setCookie("token", data.data);
      return data.data;
    }
    toast({
      variant: "error",
      title: "Error",
      description: data.message,
    });
  } catch {
    alert("An error occurred. Please try again later.");
  }
};
