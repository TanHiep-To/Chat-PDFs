import ApiError from "../../common/ApiError";
import { AppDataSource } from "../../config/dataSource";
import { File } from "../file/file.entity";
import { FileService } from "../file/file.service";
import { User } from "../user/user.entity";
import { IUser } from "../user/user.interface";
import { UserService } from "../user/user.service";
import { Message } from "./message.entity";
import { ICreateMessagePayload } from "./message.interface";

const create = async (message: ICreateMessagePayload): Promise<Message> => {
  return AppDataSource.getRepository(Message).save(message);
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

const findByFileId = async (fileId: string): Promise<Message[]> => {
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
  });
};

export const MessageService = {
  create,
  findAll,
  findOne,
  findByFileId,
};
