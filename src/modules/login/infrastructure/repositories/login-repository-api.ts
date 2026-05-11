import { LoginApi } from "../endpoints/login-api";
import type { Login } from "../../domain/entities/login";
import type { LoginRepository } from "../../domain/repositories/login-repositories";

export class LoginRepositoryApi implements LoginRepository {
  async postLogin(login: Login) {
    const response = await LoginApi.login(login);

    return response.data;
  }
}
