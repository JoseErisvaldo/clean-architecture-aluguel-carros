export const queryKeysCustomer = {
  customer: ["customer"] as const,
  customerById: (id: string) => [...queryKeysCustomer.customer, id] as const,
};
