export enum Role {
  ADMIN = "admin",
  USER = "user",
  BOT = "bot",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserPayload {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export interface IUserService {
  create(user: IUser): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  findOne(id: string): Promise<IUser | null>;
  update(id: string, user: IUser): Promise<IUser | null>;
  remove(id: string): Promise<void>;
}
