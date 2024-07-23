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
  isLoading: boolean;
};

export const ChatContext = createContext<TChatContext>({
  message: "",
  getMessages: () => {},
  addMessage: () => {},
  handleUserInputChange: () => {},
  isLoading: false,
});

export const ChatContextProvider = ({ token, fileId, children }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const backupMessage = useRef<string>("");

  const getMessages = useQuery({
    queryKey: ["getMessages"],
    queryFn: async () => {
      const response = await axios.get(
        `${SERVER_API_URL}/messages?fileId=${fileId}`
      );
      const data = await response.data;
      return data.data;
    },
  });

  if (getMessages.isLoading) return <h1>Loading....</h1>;
  if (getMessages.isError) return <h1>Error loading data!!!</h1>;

  const { mutate: sendMessage } = useMutation({
    mutationKey: ["addMessage"],
    mutationFn: async ({ message }: { message: string }) => {
      const payload: TAddMessageValidator = {
        fileId,
        message,
      };
      const { data, status } = await axios.post(
        `${SERVER_API_URL}/messages`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (status !== 200) {
        return toast({
          title: "There was a problem sending this message",
          description: "Please refresh this page and try again",
          variant: "destructive",
        });
      }
      return data;
    },
    onMutate: () => {
      backupMessage.current = message;
      setMessage("");
    },
    onError: () => {
      setMessage(backupMessage.current);
    },
    onSuccess: async (stream) => {
      setIsLoading(false);
      if (!stream) {
        return toast({
          title: "There was a problem sending this message",
          description: "Please refresh this page and try again",
          variant: "destructive",
        });
      }
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const addMessage = () => {
    sendMessage({ message });
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
        isLoading,
        message,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
