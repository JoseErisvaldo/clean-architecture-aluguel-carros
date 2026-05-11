import { authHttp } from "../../../../infrastructure/api/auth-http";
import type { Login } from "../../domain/entities/login";

export const LoginApi = {
  login: (login: Login) => authHttp.post("/token?grant_type=password", login),
};
