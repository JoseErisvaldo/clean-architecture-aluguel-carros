import { LoginRepositoryApi } from "../../infrastructure/repositories/login-repository-api";
import { PostLogin } from "../../application/use-cases/post-login";

export function useLogin() {
  const login = async (data: { email: string; password: string }) => {
    const repo = new LoginRepositoryApi();
    const useCase = new PostLogin(repo);

    const result = await useCase.execute(data);
    return result;
  };

  return { login };
}
