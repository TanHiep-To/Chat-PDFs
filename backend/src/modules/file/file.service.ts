import { Inject } from "typedi";
import { ICreateFilePayload, IFile } from "./file.interface";
import { Repository } from "typeorm";
import { AppDataSource } from "../../config/dataSource";
import { File } from "./file.entity";

export class FileService {
  private fileRepository = AppDataSource.getRepository(File);
  constructor() {}
  async create(file: ICreateFilePayload): Promise<File> {
    return this.fileRepository.save(file);
  }
}
