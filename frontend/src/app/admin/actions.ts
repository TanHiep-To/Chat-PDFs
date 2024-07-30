import { SERVER_API_URL } from "@/lib/config/const";
import { IResponse } from "@/lib/interfaces";
import axios from "axios";

export const getUsers = async (token: string) => {
  try {
    const response = await axios.get(`${SERVER_API_URL}/users/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: IResponse = response.data;
    if (data.success == true) {
      return data.data;
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
