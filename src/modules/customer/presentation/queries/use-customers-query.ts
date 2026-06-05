import { useQuery } from "@tanstack/react-query";
import { CustomerRepositoryApi } from "../../infrastructure/repositories/customer-repository-api";
import { GetCustomers } from "../../application/use-cases/get-customer";
import { queryKeysCustomer } from "../endpoints-keys/customer-keys";

const useCase = new GetCustomers(new CustomerRepositoryApi());

export const useCustomersQuery = () => {
  return useQuery({
    queryKey: queryKeysCustomer.customer,
    queryFn: async () => useCase.execute(),
  });
};
