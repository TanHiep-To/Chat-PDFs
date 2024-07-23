import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column("text", { nullable: false, name: "content" })
  content: string;

  // @ManyToOne(() => User, (user) => user.messages)
  // user: User;

  @Column("boolean", { default: true, name: "is_asked" })
  isAsked: boolean;

  @Column({ name: "file_id" })
  fileId: string;

  @ManyToOne(() => File, (file) => file.messages)
  @JoinColumn({ name: "file_id" })
  file: File;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
