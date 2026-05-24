import type { CreateCarDTO } from "../../domain/entities/cars";
import type { CarsRepositoryApi } from "../../infrastructure/repositories/cars-repositories-api";

export class GetCars {
  private repository: CarsRepositoryApi;

  constructor(repository: CarsRepositoryApi) {
    this.repository = repository;
  }

  async execute() {
    return this.repository.getAll();
  }

  async executeById(id: string) {
    return this.repository.getById(id);
  }
}

export class CreateCar {
  private repository: CarsRepositoryApi;

  constructor(repository: CarsRepositoryApi) {
    this.repository = repository;
  }

  async execute(data: CreateCarDTO) {
    return this.repository.create(data);
  }
}
