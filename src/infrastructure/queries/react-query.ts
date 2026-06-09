import { MutationCache, QueryClient } from "@tanstack/react-query";
import { cacheTime } from "./cache-time";
import { handleApiError } from "../../shared/utils/errors/handle-api-error";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  /*queryCache: new QueryCache({
    onError: () => {
      toast.error(
        "Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.",
      );
    },
  }),*/
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.skipGlobalError) return;

      const { message } = handleApiError(error);

      toast.error(message);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: cacheTime.THIRTY_SECONDS,
      gcTime: cacheTime.TEN_MINUTES,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      refetchInterval: false,
    },
  },
});
