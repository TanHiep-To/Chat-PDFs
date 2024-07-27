export interface IResponse {
  success: boolean;
  data?: any;
  message: string;
}

export interface Session {
  user: {
    id: string;
    email: string;
  };
}

export interface AuthResult {
  type: string;
  message: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface IMessage {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
  };
}

export type TMessageFetched = {
  messages: {
    content: string;
    id: string;
    isAsked: boolean;
    fileId: string;

    createdAt: Date;
    updatedAt: Date;
  }[];
  nextCursor?: string | undefined;
};

export type TOriginalMessage = {
  content: string;
  id: string;
  isAsked: boolean;
  createdAt: Date;
  nextCursor?: string | undefined;
};

export type TOmitText = Omit<TOriginalMessage, "text">;
