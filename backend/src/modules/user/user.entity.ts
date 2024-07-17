import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Message } from "../message/message.entity";
import { Role } from "./user.interface";
import { Service } from "typedi";

@Entity("users")
export class User {
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
    unique: true,
    name: "email",
  })
  email: string;

  @Column("varchar", { length: 255, nullable: false, name: "password" })
  password: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @Column("enum", { enum: Role, default: Role.USER, name: "role" })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
