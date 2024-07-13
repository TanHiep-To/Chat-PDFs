export interface IAuthService {
  register: (email: string, password: string) => Promise<string>;
  login: (email: string, password: string) => Promise<string>;
  logout: (token: string) => Promise<void>;
}
