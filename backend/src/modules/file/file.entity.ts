import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Message } from "../message/message.entity";
import { Service } from "typedi";
import { User } from "../user/user.entity";

export enum FileStatus {
  FAILED = "FAILED",
  UPLOADED = "UPLOADED",
  PROCESSING = "PROCESSING",
  PENDING = "PENDING",
}

export enum FileType {
  PDF = "PDF",
  TXT = "TXT",
  DOC = "DOC",
}

@Entity("files")
export class File {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
    name: "name",
  })
  name: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
    name: "url",
  })
  url: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
    name: "key",
  })
  key: string;

  @Column("varchar", {
    length: 255,
    nullable: false,
    name: "status",
    default: FileStatus.PENDING,
  })
  status: FileStatus;

  @Column("varchar", {
    length: 255,
    name: "size",
  })
  size: number;

  @Column("varchar", {
    length: 255,
    name: "type",
  })
  type: FileType;

  @ManyToOne(() => User, (user) => user.files)
  user: User;

  @OneToMany(() => Message, (message) => message.file)
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
