import { SERVER_API_URL } from "@/lib/config/const";
import axios from "axios";
import { IResponse } from "@/lib/interfaces";

const getMessages = async (userId: string, fileId: string) => {
  const result = await axios.get(
    `${SERVER_API_URL}/messages?userId=${userId}&fileId=${fileId}`
  );
  console.log(result.data);
  return result.data;
};

const getFile = async (userId: string, fileId: string) => {
  try {
    const result = await axios.get(
      `${SERVER_API_URL}/files?userId=${userId}&fileId=${fileId}`
    );
    const data: IResponse = result.data;
    if (data.success == true) {
      return data.data;
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export { getMessages, getFile };
