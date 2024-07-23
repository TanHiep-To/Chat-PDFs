import { OpenAIEmbeddings } from "@langchain/openai";
import ApiError from "../../common/ApiError";
import { AppDataSource } from "../../config/dataSource";
import { FileService } from "../file/file.service";

import { Message } from "./message.entity";
import {
  IBotCreateMessagePayload,
  ICreateMessagePayload,
} from "./message.interface";
import { OPENAI_API_KEY, PINECONE_INDEX_NAME } from "../../config/const";
import { pinecone } from "../../config/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { getResponse } from "../../config/response";

const create = async (message: ICreateMessagePayload): Promise<Message> => {
  const { fileId, content } = message;
  return AppDataSource.getRepository(Message).save({
    fileId,
    content,
    isAsked: true,
  });
};

const botCreate = async (message: IBotCreateMessagePayload) => {
  // vectorize the incoming user message
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: OPENAI_API_KEY,
  });
  const pineconeIndex = pinecone.Index(PINECONE_INDEX_NAME!);
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
  });
  const results = await vectorStore.similaritySearch(message.content, 4);
  const prevMessages = await findByFileId(message.fileId, 5);

  // const context = getContext(message.content, prevMessages, results);
  // const openaiResponse = await openai.chat.completions.create(context);
  // const openaiResponse = await openai.chat.completions.create({
  //   model: "gpt-4",
  //   // stream: true,
  //   temperature: 0,
  //   messages: [
  //     {
  //       role: "system",
  //       content:
  //         "Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.",
  //     },
  //     {
  //       role: "user",
  //       content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
  //   \n----------------\n
  //   PREVIOUS CONVERSATION:
  //   ${formattedPrevMessages.map((prevMessage) => {
  //     if (prevMessage.role === UserRole.USER)
  //       return `${UserRole.USER}: ${prevMessage.content}\n`;
  //     return `${UserRole.BOT}: ${prevMessage.content}\n`;
  //   })}
  //   \n----------------\n
  //   CONTEXT:
  //   ${results.map((r) => r.pageContent).join("\n\n")}
  //   USER INPUT: ${message.content}`,
  //     },
  //   ],
  // });
  const openaiResponse = await getResponse(
    message.content,
    prevMessages,
    results
  );
  const response =
    openaiResponse.choices[0].message.content ||
    "Sorry, I don't know the answer to that question.";
  // console.log("bot response: ", response);
  // return response;
  const newMessage = await AppDataSource.getRepository(Message).save({
    fileId: message.fileId,
    content: response,
    isAsked: false,
  });

  return newMessage;
};

const findAll = async (): Promise<Message[]> => {
  return AppDataSource.getRepository(Message).find();
};

const findOne = async (id: string): Promise<Message> => {
  const message = await AppDataSource.getRepository(Message).findOneBy({ id });
  if (!message) {
    throw new ApiError(404, "Message not found");
  }
  return message;
};

const findByFileId = async (
  fileId: string,
  numOfMessages: number = 100
): Promise<Message[]> => {
  const existingFile = await FileService.findOne(fileId);
  return AppDataSource.getRepository(Message).find({
    relations: {
      file: true,
    },
    where: {
      file: {
        id: fileId,
      },
    },
    order: {
      createdAt: "DESC",
    },
    take: numOfMessages,
  });
};

export const MessageService = {
  create,
  botCreate,
  findAll,
  findOne,
  findByFileId,
};
