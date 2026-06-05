/*import type { CreateCarDTO } from "../../domain/entities/cars";
import { useCreateCar } from "../mutation/use-create-car-mutation";

export default function useCreateNewCar(onSuccess?: () => void) {
  const {
    mutate: createCar,
    isPending: createCarLoading,
    error: createCarError,
    isSuccess: createCarSuccess,
  } = useCreateCar();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit", e.currentTarget);
    const data = new FormData(e.currentTarget);

    const payload = {
      brand: data.get("brand"),
      model: data.get("model"),
      color: data.get("color"),
      year: Number(data.get("year")),
      plate: data.get("plate"),
      daily_price: Number(data.get("daily_price")),
      status: data.get("status"),
    };
    if (
      payload.brand === "" ||
      payload.model === "" ||
      payload.color === "" ||
      isNaN(payload.year) ||
      payload.plate === "" ||
      isNaN(payload.daily_price) ||
      payload.status === ""
    ) {
      alert("Todos os campos são obrigatórios.");
      return;
    }
    createCar(payload as CreateCarDTO, {
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error) => {
        console.error("Erro ao criar carro:", error);
      },
    });
  };
  return {
    handleSubmit,
    createCarLoading,
    createCarError,
    createCarSuccess,
  };
}
*/

import { useMemo } from "react";
import { useCreateCar } from "../mutation/use-create-car-mutation";
import { handleApiError } from "../../../../shared/utils/errors/handle-api-error";
import type { CreateCarDTO, CreateCarForm } from "../../domain/entities/cars";
import { useForm, type SubmitHandler } from "react-hook-form";
import { CreateCarSchema } from "../../domain/schema/cars.schema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";

export function useCreateNewCar({
  handleCloseDrawer,
}: {
  handleCloseDrawer: () => void;
}) {
  const { mutate, isPending, error, isSuccess } = useCreateCar();

  const errorDtails = useMemo(() => {
    if (!error) return null;
    return handleApiError(error);
  }, [error]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateCarForm>({
    resolver: zodResolver(CreateCarSchema),
    defaultValues: {
      brand: "",
      model: "",
      plate: "",
      year: undefined,
      daily_price: undefined,
      status: "available",
    },
  });

  const onSubmit: SubmitHandler<CreateCarForm> = async (data) => {
    const createCarDTO: CreateCarDTO = CreateCarSchema.parse(data);
    mutate(createCarDTO, {
      onSuccess: () => {
        handleCloseDrawer();
        reset();
      },
    });
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    control,
    errors,
    isPending,
    errorDtails,
    isSuccess,
  };
}
