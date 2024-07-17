import { FileStatus } from "./file.entity";

export interface IFile {
  id: string;
  name: string;
  url: string;
  key: string;
  size: number;
  status: FileStatus;
}

export interface ICreateFilePayload {
  name: string;
  url: string;
  key: string;
  size: number;
  status: FileStatus;
}
