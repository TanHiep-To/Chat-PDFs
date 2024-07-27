"use client";

import { createContext, useEffect, useRef, useState } from "react";

import axios from "axios";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";

import { TAddMessageValidator } from "@/lib/validators/message";
import { SERVER_API_URL } from "@/lib/config/const";
import { TMessageFetched } from "@/lib/interfaces";

interface Props {
  token: string;
  fileId: string;
  children: React.ReactNode;
}

export type TChatContext = {
  message: string;
  messagesFetched: InfiniteData<TMessageFetched, unknown> | undefined;
  fetchNextPage: () => void;
  addMessage: () => void;
  handleUserInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  isThinking: boolean;
};

export const ChatContext = createContext<TChatContext>({
  message: "",
  messagesFetched: undefined,
  fetchNextPage: async () => {},
  addMessage: async () => {},
  handleUserInputChange: () => {},
  isThinking: false,
});

export const ChatContextProvider = ({ children, token, fileId }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [messagesFetched, setMessagesFetched] = useState<
    InfiniteData<TMessageFetched, unknown>
  >({
    pages: [],
    pageParams: [],
  });
  const backupMessage = useRef<string>("");

  const { data, fetchNextPage, refetch } = useInfiniteQuery<TMessageFetched>({
    queryKey: ["getMessages"],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await axios.get(
        `${SERVER_API_URL}/messages?fileId=${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success === false) throw new Error("Error getting messages");
      const messages = data.data;
      return { messages, nextCursor: data.nextCursor } as TMessageFetched;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  const { mutate: sendMessage } = useMutation({
    mutationKey: ["addMessage"],
    mutationFn: async ({ content }: { content: string }) => {
      const payload: TAddMessageValidator = {
        fileId,
        content,
      };

      const { data: dataUser } = await axios.post(
        `${SERVER_API_URL}/messages`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (dataUser.success === false) {
        // return toast({
        //   title: "There was a problem sending this message",
        //   description: "Please refresh this page and try again",
        //   variant: "destructive",
        // });
        console.error("Error sending message");
        return "Error sending message";
      }
      await refetch();

      console.log("refetching1");
      const { data: dataBot } = await axios.post(
        `${SERVER_API_URL}/messages/bot`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (dataBot.success === false) {
        // return toast({
        //   title: "There was a problem sending this message",
        //   description: "Please refresh this page and try again",
        //   variant: "destructive",
        // });
        console.error("Error answering message");
        return "Error answering message";
      }
      if (!dataUser.data) {
        // return toast({
        //   title: "There was a problem sending this message",
        //   description: "Please refresh this page and try again",
        //   variant: "destructive",
        // });
        console.error("Error sending message");
        return "Error sending message";
      }

      await refetch();
      console.log("refetching2");

      console.log("messagesFetched11: ", messagesFetched.pages);
      return dataUser;
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

  useEffect(() => {
    if (data) {
      setMessagesFetched(data);
    }
  }, [data]);

  const addMessage = async () => {
    sendMessage({ content: message });
    await refetch();
  };

  const handleUserInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  return (
    <ChatContext.Provider
      value={{
        messagesFetched,
        fetchNextPage,
        addMessage,
        handleUserInputChange,
        isThinking,
        message,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
