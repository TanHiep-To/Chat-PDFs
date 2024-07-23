import { SERVER_API_URL } from "@/lib/config/const";
import { IResponse } from "@/lib/interfaces";
import axios from "axios";

export const getMessages = async (userId: string, fileId: string) => {
  const result = await axios.get(
    `${SERVER_API_URL}/messages?userId=${userId}&fileId=${fileId}`
  );
  console.log(result.data);
  return result.data;
};

export const getFileByFileId = async (fileId: string, accessToken: string) => {
  try {
    const result = await axios.get(`${SERVER_API_URL}/files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: IResponse = result.data;
    if (data.success == true) {
      console.log("data.data", data.data);
      return data.data;
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
