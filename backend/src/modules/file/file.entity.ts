import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
