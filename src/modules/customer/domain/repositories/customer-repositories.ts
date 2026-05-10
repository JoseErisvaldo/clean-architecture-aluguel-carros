import type { Customer } from "../entities/customer";

export interface CustomerRepository {
  getAll(): Promise<Customer[]>;
  getById(id: string): Promise<Customer>;
}
