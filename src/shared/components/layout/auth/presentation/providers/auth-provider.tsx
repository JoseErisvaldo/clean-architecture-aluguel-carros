import { createContext, useMemo, useState, type ReactNode } from "react";
import { AuthStorage } from "../../infrastructure/storage/auth-storage";

interface AuthContextValue {
  isAuthenticated: boolean;
  refreshAuth: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(AuthStorage.getToken()),
  );

  const refreshAuth = () => {
    setIsAuthenticated(Boolean(AuthStorage.getToken()));
  };

  const logout = () => {
    AuthStorage.clear();
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ isAuthenticated, refreshAuth, logout }),
    [isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
