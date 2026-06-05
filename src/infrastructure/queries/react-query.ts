import { QueryClient } from "@tanstack/react-query";
import { cacheTime } from "./cache-time";

export const queryClient = new QueryClient({
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
