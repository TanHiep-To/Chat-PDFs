"use client";

import { createContext, useRef, useState } from "react";

import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";

import { TAddMessageValidator } from "@/lib/validators/message";
import { SERVER_API_URL } from "@/lib/config/const";

interface Props {
  token: string;
  fileId: string;
  children: React.ReactNode;
}

export type TChatContext = {
  message: string;
  getMessages: any;
  addMessage: () => void;
  handleUserInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  isThinking: boolean;
  numOfMessages: number;
  setNumOfMessages: React.Dispatch<React.SetStateAction<number>>;
};

export const ChatContext = createContext<TChatContext>({
  message: "",
  getMessages: () => {},
  addMessage: () => {},
  handleUserInputChange: () => {},
  isThinking: false,
  numOfMessages: 0,
  setNumOfMessages: () => {},
});

export const ChatContextProvider = ({ children, token, fileId }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [numOfMessages, setNumOfMessages] = useState<number>(0);
  const backupMessage = useRef<string>("");

  const getMessages = useQuery({
    queryKey: ["getMessages"],
    queryFn: async () => {
      const response = await axios.get(
        `${SERVER_API_URL}/messages?fileId=${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      return data.data;
    },
  });

  if (getMessages.isLoading) return <h1>Loading....</h1>;
  if (getMessages.isError) return <h1>Error loading data!!!</h1>;

  const { mutate: sendMessage } = useMutation({
    mutationKey: ["addMessage"],
    mutationFn: async ({ content }: { content: string }) => {
      const payload: TAddMessageValidator = {
        fileId,
        content,
      };

      const { data: dataUser, status: statusUser } = await axios.post(
        `${SERVER_API_URL}/messages`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (statusUser !== 200) {
        // return toast({
        //   title: "There was a problem sending this message",
        //   description: "Please refresh this page and try again",
        //   variant: "destructive",
        // });
        console.error("Error sending message");
        return "Error sending message";
      }
      // const { data: dataBot, status: statusBot } = await axios.post(
      //   `${SERVER_API_URL}/messages/bot`,
      //   payload,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // if (statusBot !== 200) {
      //   // return toast({
      //   //   title: "There was a problem sending this message",
      //   //   description: "Please refresh this page and try again",
      //   //   variant: "destructive",
      //   // });
      //   console.error("Error answering message");
      //   return "Error answering message";
      // }
      setNumOfMessages((prev) => prev + 1);
      console.log("numOfMessages: ", numOfMessages);
      return dataUser;
      //  dataBot
    },
    onMutate: () => {
      backupMessage.current = message;
      setMessage("");
    },
    onError: () => {
      setMessage(backupMessage.current);
    },
    onSuccess: async (stream) => {
      setIsThinking(false);
      if (!stream) {
        return toast({
          title: "There was a problem sending this message",
          description: "Please refresh this page and try again",
          variant: "destructive",
        });
      }
    },
    onSettled: () => {
      setIsThinking(false);
    },
  });

  const addMessage = () => {
    sendMessage({ content: message });
  };

  const handleUserInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  return (
    <ChatContext.Provider
      value={{
        getMessages,
        addMessage,
        handleUserInputChange,
        isThinking,
        message,
        numOfMessages,
        setNumOfMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
