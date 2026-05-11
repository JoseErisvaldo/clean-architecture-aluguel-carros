import { useCallback } from "react";
import { GetUserFromStorage } from "../../application/use-cases/get-user-from-storage";

export function useUserStorage() {
  const getUser = useCallback(() => {
    const useCase = new GetUserFromStorage();
    return useCase.execute();
  }, []);

  return { getUser };
}
