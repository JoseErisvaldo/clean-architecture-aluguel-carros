import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCar } from "../../application/use-cases/get-customer";
import type { Cars, CreateCarDTO } from "../../domain/entities/cars";
import { CarsRepositoryApi } from "../../infrastructure/repositories/cars-repositories-api";

const createCarUseCase = new CreateCar(new CarsRepositoryApi());

export function useCreateCar() {
  const queryClient = useQueryClient();

  return useMutation<Cars, unknown, CreateCarDTO>({
    mutationFn: (data) => createCarUseCase.execute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}
