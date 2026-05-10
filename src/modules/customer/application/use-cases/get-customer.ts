// modules/Customers/application/use-cases/GetCustomers.ts

import type { CustomerRepository } from "../../domain/repositories/customer-repositories";

export class GetCustomers {
  private repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async execute() {
    return this.repository.getAll();
  }

  async executeById(id: string) {
    return this.repository.getById(id);
  }
}
