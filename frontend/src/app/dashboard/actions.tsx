import { SERVER_API_URL } from "@/lib/config/const";
import { IResponse } from "@/lib/interfaces";
import axios from "axios";

export const getProfile = async (token: string) => {
  try {
    const response = await axios.get(`${SERVER_API_URL}/users/me`, {
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
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFiles = async (token: string) => {
  try {
    const response = await axios.get(`${SERVER_API_URL}/files`, {
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
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
