import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";

import { TOriginalMessage } from "@/lib/interfaces";

import { Icon } from "@/components/Icon";
import { useEffect } from "react";

interface Props {
  message: TOriginalMessage;
  isNextMsgSamePerson: boolean;
}

const Message = ({ message, isNextMsgSamePerson }: Props) => {
  return (
    <div
      className={cn("flex items-end", {
        "justify-end": message.isAsked,
      })}
    >
      <div
        className={cn(
          "relative flex aspect-square h-6 w-6 items-center justify-center",
          {
            "order-2 rounded-full bg-primary": message.isAsked,
            "order-1 rounded-full bg-zinc-200": !message.isAsked,
            invisible: isNextMsgSamePerson,
          }
        )}
      >
        {message.isAsked ? (
          <Icon.user className="h-3/4 w-3/4 fill-zinc-200 text-zinc-200" />
        ) : (
          <Icon.logo className="h-4 w-4 fill-zinc-300" />
        )}
      </div>

      <div
        className={cn("mx-2 flex max-w-md flex-col space-y-2 text-base", {
          "order-1 items-end": message.isAsked,
          "order-2 items-start": !message.isAsked,
        })}
      >
        <div
          className={cn("inline-block rounded-2xl px-4 py-2", {
            "bg-gray-200 text-black": message.isAsked,
            "bg-cyan-200 text-gray-900": !message.isAsked,
          })}
        >
          {typeof message.content === "string" ? (
            <ReactMarkdown
              className={cn("prose", {
                " selection:text-zinc-800": message.isAsked,
              })}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            message.content
          )}
          {message.id !== "loading-message" ? (
            <div
              className={cn("mt-2 w-full select-none text-right text-xs", {
                "text-purple-500": message.isAsked,
                "text-zinc-500": !message.isAsked,
              })}
            >
              {format(new Date(message.createdAt), "HH:mm")}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Message;
