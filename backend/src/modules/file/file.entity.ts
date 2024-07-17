import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Message } from "../message/message.entity";
import { Service } from "typedi";

export enum FileStatus {
  FAILED = "FAILED",
  UPLOADED = "UPLOADED",
  PROCESSING = "PROCESSING",
  PENDING = "PENDING",
}

@Service("fileEntity")
@Entity("files")
export class File {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
    unique: false,
    name: "name",
  })
  name: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
    unique: false,
    name: "url",
  })
  url: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
    unique: false,
    name: "key",
  })
  key: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
    unique: false,
    name: "status",
    default: FileStatus.PENDING,
  })
  status: FileStatus;

  @Column("varchar", {
    length: 255,
    unique: false,
    name: "size",
  })
  size: number;

  @OneToMany(() => Message, (message) => message.file)
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
