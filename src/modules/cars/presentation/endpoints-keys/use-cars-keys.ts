export const queryKeys = {
  cars: ["cars"] as const,
  carById: (id: string) => [...queryKeys.cars, id] as const,
};
