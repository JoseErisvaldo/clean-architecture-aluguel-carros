import { Chip } from "@mui/material";

export const StatusCars = ({ params }: { params: { value: string } }) => {
  const status = params.value as string;

  const color =
    status === "available"
      ? "success"
      : status === "rented"
        ? "error"
        : "default";

  const label =
    status === "available"
      ? "Disponível"
      : status === "rented"
        ? "Alugado"
        : status === "maintenance"
          ? "Manutenção"
          : "Desconecido";
  return [<Chip key="status" label={label} color={color} />];
};
