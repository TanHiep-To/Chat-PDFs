"use client";

import { cn } from "@/lib/utils";
import { ChatList } from "@/components/ChatList";
// import { ChatPanel } from "@/components/chat-panel";
// import { EmptyScreen } from "@/components/empty-screen";
import { useEffect, useState } from "react";
// import { useUIState, useAIState } from "ai/rsc";
import { Message, Session } from "@/lib/interfaces";
import { usePathname, useRouter } from "next/navigation";
// import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { toast } from "sonner";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  session?: Session;
}

export function Chat({ id, className, session }: ChatProps) {
  const router = useRouter();
  const path = usePathname();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  // const [messages] = useUIState();
  // const [aiState] = useAIState();

  // const [_, setNewChatId] = useLocalStorage("newChatId", id);

  useEffect(() => {
    if (session?.user) {
    }
  }, [id, path, session?.user, messages]);

  useEffect(() => {
    if (messages.length === 2) {
      router.refresh();
    }
  }, [messages, router]);

  // useEffect(() => {
  //   setNewChatId(id);
  // });

  // useEffect(() => {
  //   missingKeys.map((key) => {
  //     toast.error(`Missing ${key} environment variable!`);
  //   });
  // }, [missingKeys]);

  // const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
  //   useScrollAnchor();

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      // ref={scrollRef}
    >
      <div
        className={cn("pb-[200px] pt-4 md:pt-10", className)}
        // ref={messagesRef}
      >
        <ChatList messages={messages} session={session} />
        <div
          className="w-full h-px"
          // ref={visibilityRef}
        />
      </div>
      {/* <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      /> */}
    </div>
  );
}
