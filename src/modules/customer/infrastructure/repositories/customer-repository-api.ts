import type { Customer } from "../../domain/entities/customer";
import type { CustomerRepository } from "../../domain/repositories/customer-repositories";
import { CustomersApi } from "../endpoints/customer-api";

export class CustomerRepositoryApi implements CustomerRepository {
  async getAll(): Promise<Customer[]> {
    const data = await CustomersApi.getAll();
    return data.data;
  }

  async getById(id: string): Promise<Customer> {
    const data = await CustomersApi.getById(id);

    if (Array.isArray(data.data) && data.data.length > 0) {
      return data.data[0] as Customer;
    }

    throw new Error("Customer not found");
  }
}
