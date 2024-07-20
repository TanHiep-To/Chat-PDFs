import { Toast, ToasterToast } from "@/components/ui/use-toast";

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

export interface Message {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
  };
}

export type IToast = ({ ...props }: Toast) => {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
};
