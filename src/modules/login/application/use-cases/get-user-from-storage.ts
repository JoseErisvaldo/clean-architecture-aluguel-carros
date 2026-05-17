import { AuthStorage } from "../../../../shared/components/layout/auth/infrastructure/storage/auth-storage";

export class GetUserFromStorage {
  execute() {
    return AuthStorage.getUser();
  }
}
