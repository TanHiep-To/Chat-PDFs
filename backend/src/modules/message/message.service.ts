import { AppDataSource } from "../../config/dataSource";
import { IUser } from "../user/user.interface";
import { Message } from "./message.entity";

class MessageService {
  private messageRepository = AppDataSource.getRepository(Message);
  constructor() {}
  // async create(message: string, sender: IUser): Promise<Message> {}
}
