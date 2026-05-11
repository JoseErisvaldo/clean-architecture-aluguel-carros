const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const AuthStorage = {
  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveUser(user: unknown) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser<T = unknown>(): T | null {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
