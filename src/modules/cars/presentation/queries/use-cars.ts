import { useQuery } from "@tanstack/react-query";
import { GetCars } from "../../application/use-cases/get-customer";
import { CarsRepositoryApi } from "../../infrastructure/repositories/cars-repositories-api";
import { queryKeys } from "../endpoints-keys/use-cars-keys";

const useCase = new GetCars(new CarsRepositoryApi());

export default function useCarsQueries() {
  return useQuery({
    queryKey: queryKeys.cars,
    queryFn: () => useCase.execute(),
  });
}
