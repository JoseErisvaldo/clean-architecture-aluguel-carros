import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCar } from "../../application/use-cases/get-customer";
import type { Cars, CreateCarDTO } from "../../domain/entities/cars";
import { CarsRepositoryApi } from "../../infrastructure/repositories/cars-repositories-api";
import { toast } from "sonner";
//import { handleApiError } from "../../../../shared/utils/errors/handle-api-error";

const createCarUseCase = new CreateCar(new CarsRepositoryApi());

export function useCreateCar() {
  const queryClient = useQueryClient();

  return useMutation<Cars, unknown, CreateCarDTO>({
    mutationFn: (data) => createCarUseCase.execute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success("Carro criado com sucesso!");
    },

    /*onError: (error) => {
      toast.error("Erro ao criar carro. Tente novamente.", {
        description: String(error),
      });
    },*/

    /*onError: (error) => {
      toast.error(handleApiError(error).message);
    },*/

    //Caso queria controlar o erro em cada componente, pode-se usar o onError do useMutation e passar skipGlobalError: true aqui, porem a configuracao glocal deve ter a validacao para verificar se o erro tem essa flag, caso tenha, nao exibe o toast global
    /*meta: {
      skipGlobalError: true,
    },*/
  });
}
