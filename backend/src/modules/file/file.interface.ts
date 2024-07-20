import { FileStatus, FileType } from "./file.entity";

export interface IFile {
  id: string;
  name: string;
  url: string;
  key: string;
  size: number;
  status: FileStatus;
  type: FileType;
}

export interface ICreateFilePayload {
  name: string;
  url: string;
  key: string;
  size: number;
  status: FileStatus;
  type: FileType;
}
