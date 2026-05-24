export interface Cars {
  id: string;
  brand: string;
  model: string;
  plate: string;
  year: number;
  daily_price: number;
  status: "available" | "unavailable" | string;
  created_at: string;
}
