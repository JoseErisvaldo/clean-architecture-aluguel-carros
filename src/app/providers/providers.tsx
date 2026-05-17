import type { ReactNode } from "react";
import { AuthProvider } from "../../shared/components/layout/auth/presentation/providers/auth-provider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
