import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../shared/components/layout/auth/presentation/providers/auth-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "../../infrastructure/queries/react-query";
import { Toaster } from "sonner";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
      <Toaster richColors position="top-right" closeButton />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
