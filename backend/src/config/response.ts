import { Message } from "../modules/message/message.entity";
import { UserRole } from "../modules/user/user.interface";
import { openai } from "./openai";

export const getResponse = async (
  question: string,
  prevMessages: Message[],
  similarities: any
) => {
  const formattedPrevMessages = prevMessages.map((prevMessage) => ({
    role: prevMessage.isAsked
      ? (UserRole.USER as const)
      : (UserRole.BOT as const),
    content: prevMessage.content,
  }));

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    // stream: true,
    temperature: 0,
    messages: [
      {
        role: "system",
        content:
          "Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.",
      },
      {
        role: "user",
        content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
    \n----------------\n
    PREVIOUS CONVERSATION:
    ${formattedPrevMessages.map((prevMessage) => {
      if (prevMessage.role === UserRole.USER)
        return `${UserRole.USER}: ${prevMessage.content}\n`;
      return `${UserRole.BOT}: ${prevMessage.content}\n`;
    })}
    \n----------------\n
    CONTEXT:
    ${similarities
      .map((similarity: any) => similarity.pageContent)
      .join("\n\n")}
    USER INPUT: ${question}`,
      },
    ],
  });

  return response;
};
