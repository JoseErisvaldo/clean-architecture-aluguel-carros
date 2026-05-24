import type { Cars } from "../../domain/entities/cars";
import { CarsApi } from "../endpoints/cars-api";

export class CarsRepositoryApi {
  async getAll(): Promise<Cars[]> {
    const response = await CarsApi.getAll();
    return response.data;
  }
  async getById(id: string): Promise<Cars | null> {
    const response = await CarsApi.getById(id);
    return response.data.length > 0 ? response.data[0] : null;
  }
}
