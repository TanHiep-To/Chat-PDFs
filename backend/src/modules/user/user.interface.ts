export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  BOT = "BOT",
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
  role?: UserRole;
}
