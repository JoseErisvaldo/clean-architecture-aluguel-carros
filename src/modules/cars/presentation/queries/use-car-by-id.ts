import { GetCars } from "../../application/use-cases/get-customer";
import { CarsRepositoryApi } from "../../infrastructure/repositories/cars-repositories-api";
import { queryKeys } from "../endpoints-keys/use-cars-keys";

const useCase = new GetCars(new CarsRepositoryApi());

import { useQuery } from "@tanstack/react-query";

export function useCarByIdQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.carById(id),
    queryFn: () => useCase.executeById(id),
    enabled: !!id,
  });
}
