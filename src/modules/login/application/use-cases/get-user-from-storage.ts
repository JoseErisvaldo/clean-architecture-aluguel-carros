import { AuthStorage } from "../../../../shared/auth/infrastructure/storage/auth-storage";

export class GetUserFromStorage {
  execute() {
    return AuthStorage.getUser();
  }
}
