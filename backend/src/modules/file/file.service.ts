import { ICreateFilePayload, IFile } from "./file.interface";
import { AppDataSource } from "../../config/dataSource";
import { File } from "./file.entity";
import ApiError from "../../common/ApiError";

const create = async (file: ICreateFilePayload): Promise<File> => {
  return AppDataSource.getRepository(File).save(file);
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
