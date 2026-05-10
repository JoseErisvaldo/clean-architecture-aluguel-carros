import { http } from "../../../../infrastructure/api/http";

export const CustomersApi = {
  getAll: () => http.get("/customers?select=*"),
  getById: (id: string) => http.get(`/customers?select=*&id=eq.${id}&limit=1`),
};
