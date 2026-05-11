import type { Login } from "../entities/login";

export interface LoginRepository {
  postLogin(login: Login): Promise<{ access_token: string }>;
}
