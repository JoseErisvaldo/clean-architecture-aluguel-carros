import { http } from "../../../../infrastructure/api/http";

export const CarsApi = {
  getAll: () => http.get("/cars?select=*"),
  getById: (id: string) => http.get(`/cars?select=*&id=eq.${id}&limit=1`),
};
