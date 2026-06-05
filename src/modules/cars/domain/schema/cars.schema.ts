import { z } from "zod";

export const CarsSchema = z.object({
  id: z.string(),

  brand: z.string().min(1, "Marca é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  plate: z.string().min(1, "Placa é obrigatória"),

  year: z.coerce
    .number()
    .min(1886, "Ano deve ser a partir de 1886")
    .max(new Date().getFullYear(), "Ano não pode ser no futuro"),

  daily_price: z.coerce.number().gt(0, "Preço diário deve ser maior que 0"),

  status: z.enum(["available", "unavailable"]),

  created_at: z.string(),
});

export const CreateCarSchema = CarsSchema.omit({
  id: true,
  created_at: true,
});
