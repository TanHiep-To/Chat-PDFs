import { SERVER_API_URL } from "@/lib/config/const";
import { IResponse } from "@/lib/interfaces";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirect } from "next/navigation";

export const handleRegister = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const name = `${firstName} ${lastName}`;
    const response = await axios.post(`${SERVER_API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    const data: IResponse = response.data;
    if (data.success == true) {
      console.log("Registered Successfully");
      redirect("/login");
    } else {
      console.log("Error: ", data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
