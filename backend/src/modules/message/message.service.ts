import { AppDataSource } from "../../config/dataSource";
import { IUser } from "../user/user.interface";
import { Message } from "./message.entity";
import { ICreateMessagePayload } from "./message.interface";

class MessageService {
  private messageRepository = AppDataSource.getRepository(Message);
  constructor() {}
  async create(message: ICreateMessagePayload): Promise<Message> {
    return this.messageRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }
}
