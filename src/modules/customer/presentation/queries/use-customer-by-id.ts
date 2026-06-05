import { useQuery } from "@tanstack/react-query";
import { GetCustomers } from "../../application/use-cases/get-customer";
import { CustomerRepositoryApi } from "../../infrastructure/repositories/customer-repository-api";
import { queryKeysCustomer } from "../endpoints-keys/customer-keys";

const useCase = new GetCustomers(new CustomerRepositoryApi());

export const useCustomerByIdQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeysCustomer.customerById(id),
    queryFn: async ({ signal }) => {
      return await useCase.executeById(id, signal);
    },
    enabled: Boolean(id),
  });
};
