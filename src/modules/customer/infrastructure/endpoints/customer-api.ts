import { http } from "../../../../infrastructure/api/http";

export const CustomersApi = {
  getAll: () => http.get("/customers?select=*"),
  getById: (id: string, options?: { signal?: AbortSignal }) =>
    http.get(`/customers?select=*&id=eq.${id}&limit=1`, options),
};
