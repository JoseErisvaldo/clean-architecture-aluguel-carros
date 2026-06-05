import type z from "zod";
import type { CarsSchema, CreateCarSchema } from "../schema/cars.schema";

export type Cars = z.infer<typeof CarsSchema>;
export type CreateCarForm = z.input<typeof CreateCarSchema>;
export type CreateCarDTO = z.output<typeof CreateCarSchema>;
