import { ICreateFilePayload, IFile } from "./file.interface";
import { AppDataSource } from "../../config/dataSource";
import { File, FileStatus } from "./file.entity";
import ApiError from "../../common/ApiError";
import {
  OPENAI_API_KEY,
  PINECONE_INDEX_NAME,
  UPLOADTHING_URL_HEADER,
} from "../../config/const";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
// import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { pinecone } from "../../config/pinecone";

const create = async (file: ICreateFilePayload): Promise<File> => {
  const newFile = await AppDataSource.getRepository(File).save({
    ...file,
    status: FileStatus.UPLOADED,
    url: `${UPLOADTHING_URL_HEADER}/${file.key}`,
  });

  const pdfResponse = await fetch(`${newFile.url}`);
  const pdfBlob = await pdfResponse.blob();
  const loader = new PDFLoader(pdfBlob);
  const pageLevelDocs = await loader.load();
  const pagesAmount = pageLevelDocs.length;

  const pineconeIndex = pinecone.Index(PINECONE_INDEX_NAME!);
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: OPENAI_API_KEY,
  });

  await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
    pineconeIndex,
    // ! The namespace feature is not supported for the free tier of Pinecone.
    // namespace: createdFile.id,
  });

  return newFile;
};

const findAll = async (): Promise<File[]> => {
  return AppDataSource.getRepository(File).find();
};

const findOne = async (id: string): Promise<File> => {
  const file = await AppDataSource.getRepository(File).findOneBy({ id });
  if (!file) {
    throw new ApiError(404, "File not found");
  }
  return file;
};

const findByUserId = async (userId: string): Promise<File[]> => {
  return AppDataSource.getRepository(File).find({
    relations: {
      user: true,
    },
    where: {
      user: {
        id: userId,
      },
    },
  });
};

export const FileService = {
  create,
  findAll,
  findOne,
  findByUserId,
};
