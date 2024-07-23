import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "./user.interface";
import { File } from "../file/file.entity";

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

  @Column("varchar", {
    length: 255,
    nullable: false,
    name: "password",
  })
  password: string;

  // @OneToMany(() => Message, (message) => message.user)
  // messages: Message[];

  @OneToMany(() => File, (file) => file.user)
  files: File[];

  @Column("enum", { enum: UserRole, default: UserRole.USER, name: "role" })
  role: UserRole;

  @Column("boolean", { default: false, name: "is_verified" })
  is_verified: boolean;

  @Column("boolean", { default: false, name: "is_banned" })
  is_banned: boolean;

  @Column("boolean", { default: false, name: "is_vip" })
  is_vip: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
