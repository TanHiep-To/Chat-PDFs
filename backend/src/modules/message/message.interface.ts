export interface IMessage {
  id: string;
  content: string;
  isAsked: boolean;
  fileId: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateMessagePayload {
  content: string;
  fileId: string;
  isAsked?: boolean;
}
export interface IBotCreateMessagePayload {
  content: string;
  fileId: string;
  isAsked?: boolean;
}
