import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { File } from "../file/file.entity";

@Entity("message")
export class Message {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column("varchar", { length: 255, nullable: false, name: "content" })
  content: string;

  // @ManyToOne(() => User, (user) => user.messages)
  // user: User;

  @Column("boolean", { default: true, name: "is-asked" })
  isAsked: boolean;

  @ManyToOne(() => File, (file) => file.messages)
  file: File;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
