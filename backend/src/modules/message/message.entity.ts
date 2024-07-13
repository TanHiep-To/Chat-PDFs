import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity("message")
export class Message {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: number;

  @Column("nvarchar", { length: 255, nullable: false, name: "text" })
  text: string;

  @Column()
  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  // @Column()
  // file:

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
