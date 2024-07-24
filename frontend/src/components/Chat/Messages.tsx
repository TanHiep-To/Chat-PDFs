import { useContext, useEffect, useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, MessageCircle } from "lucide-react";
import Skeleton from "react-loading-skeleton";

import { ChatContext } from "@/context/ChatContext";

import Message from "./Message";

import { INFINITE_QUERY_LIMIT, SERVER_API_URL } from "@/lib/config/const";

import { TGetMessageValidator } from "@/lib/validators/message";

import { TMessageFetched } from "@/lib/interfaces";
import { UserContext } from "@/context/UserContext";

interface Props {
  fileId: string;
}

const Messages = ({ fileId }: { fileId: string }) => {
  const { token } = useContext(UserContext);
  const { isThinking, getMessages, numOfMessages } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  // const { data, fetchNextPage, isLoading } = useInfiniteQuery({
  //   queryKey: ["getMessages"],
  //   queryFn: async ({ pageParam = 0 }) => {
  //     const payload: TGetMessageValidator = {
  //       fileId,
  //       limit: INFINITE_QUERY_LIMIT,
  //     };
  //     const { data, status } = await axios.get(
  //       `${SERVER_API_URL}/message?fileId=${fileId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (status !== 200) throw new Error("Error getting messages");
  //     return data as TMessageFetched;
  //   },
  //   getNextPageParam: (lastPage, pages) => lastPage?.nextCursor,
  //   keepPreviousData: true,
  // });

  useEffect(() => {
    // fetchNextPage();
    // }, [fetchNextPage]);
    const initMessages = async () => {
      const response = await axios.get(
        `${SERVER_API_URL}/messages?fileId=${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      console.log("messages: ", data.data);
      setMessages(data.data);
      return data.data;
    };
    // getMessages.mutate(initMessages);
    initMessages();
  }, [numOfMessages]);

  const loadingMessage = {
    id: "loading-message",
    // content: (
    //   <span className="flex h-full items-center justify-center">
    //     Loading...
    //     <Loader2 className="ml-1.5 h-3 w-3 animate-spin text-primary" />
    //   </span>
    // ),
    content: "Loading...",
    isAsked: false,
    createdAt: new Date(),
  };

  // const messages = data?.pages.flatMap((page) => page.messages);
  // const messages = getMessages.data;
  const combinedMessages = [
    ...(isThinking ? [loadingMessage] : []),
    ...(messages ?? []),
  ];

  return (
    <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex max-h-[calc(100vh-7rem-7rem)] flex-1 flex-col-reverse gap-4 overflow-y-auto border-zinc-200 p-3">
      {combinedMessages && combinedMessages.length > 0 ? (
        combinedMessages.map((message, index) => {
          const isNextMessageSamePerson =
            combinedMessages[index - 1]?.isAsked ===
            combinedMessages[index]?.isAsked;

          if (index === combinedMessages.length - 1) {
            return (
              <Message
                key={message.id}
                isNextMsgSamePerson={isNextMessageSamePerson}
                message={message}
              />
            );
          } else {
            return (
              <Message
                key={message.id}
                isNextMsgSamePerson={isNextMessageSamePerson}
                message={message}
              />
            );
          }
        })
      ) : isThinking ? (
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <MessageCircle className="h-10 w-10 text-primary" />
          <h3 className="text-xl font-semibold">You&apos;re all set!</h3>
          <p className="text-sm text-zinc-500">
            Ask your first question to the Chat-PDF bot.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
