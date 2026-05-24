import { http } from "../../../../infrastructure/api/http";
import type { CreateCarDTO } from "../../domain/entities/cars";

export const CarsApi = {
  getAll: () => http.get("/cars?select=*"),
  getById: (id: string) => http.get(`/cars?select=*&id=eq.${id}&limit=1`),
  create: (data: CreateCarDTO) => http.post("/cars", data),
};
