"use client";

import { useContext, useEffect } from "react";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import Link from "next/link";

import ChatInput from "./ChatInput";

import { ChatContextProvider } from "@/context/ChatContext";

import Messages from "./Messages";

import { buttonVariants } from "@/components/ui/button";
import { INFINITE_QUERY_LIMIT, SERVER_API_URL } from "@/lib/config/const";
import { UserContext } from "@/context/UserContext";
import { TMessageFetched } from "@/lib/interfaces";
import { TGetMessageValidator } from "@/lib/validators/message";

interface Props {
  fileId: string;
  token: string;
}

const ChatBox = ({ fileId }: Props) => {
  const { token } = useContext(UserContext);
  const {
    data: file,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-upload-status"],
    enabled: false,
    queryFn: async () => {
      if (!fileId) return;
      const { data } = await axios.get(`${SERVER_API_URL}/files/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!data) {
        console.error("No data returned from server");
      }
      console.log("data1: ", data.data);
      type UploadStatus = "SUCCESS" | "PENDING" | "FAILURE" | "PROCESSING";
      return data.data.status as UploadStatus;
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (process.env.NODE_ENV === "production") {
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <XCircle className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">
              No OpenAI and Pinecone API
            </h3>
            <p className="text-sm text-zinc-500">
              You will not be able to use the chatbot unless you set it up
              locally with the necessary APIs.
            </p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <h3 className="text-xl font-semibold">
              Loading...Hang on tight ✨
            </h3>
            <p className="text-sm text-zinc-500">
              We&apos;re preparing your PDF.
            </p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );
  }

  if (file === "PROCESSING") {
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <h3 className="text-xl font-semibold">Processing PDF...🚀</h3>
            <p className="text-sm text-zinc-500">
              This shouldn&apos;t take long.
            </p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );
  }

  if (file === "FAILURE") {
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <XCircle className="h-8 w-8 text-red-500" />
            <h3 className="text-xl font-semibold">Too many pages in PDF</h3>
            <p className="text-sm text-zinc-500">
              Your <span className="font-medium">Free</span> plan supports up to{" "}
              5 pages per PDF.
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "secondary",
                className: "mt-4",
              })}
            >
              <ChevronLeft className="mr-1.5 h-3 w-3" />
              Back
            </Link>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );
  }

  return (
    <ChatContextProvider token={token} fileId={fileId}>
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col justify-between">
          <Messages />
        </div>
        <ChatInput />
      </div>
    </ChatContextProvider>
  );
};

export default ChatBox;
