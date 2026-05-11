import { AuthStorage } from "../../../../shared/auth/infrastructure/storage/auth-storage";
import type { Login } from "../../domain/entities/login";
import type { LoginRepository } from "../../domain/repositories/login-repositories";

export class PostLogin {
  private repository: LoginRepository;

  constructor(repository: LoginRepository) {
    this.repository = repository;
  }

  async execute(login: Login) {
    const response = await this.repository.postLogin(login);
    const token = response.access_token;

    AuthStorage.saveToken(token);

    return response;
  }
}
