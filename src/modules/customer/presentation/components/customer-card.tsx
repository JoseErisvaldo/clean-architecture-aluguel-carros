import { Link } from "react-router";
import type { Customer } from "../../domain/entities/customer";

export function CustomerCard({ Customer }: { Customer: Customer }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 10 }}>
      <h3>{Customer.name}</h3>
      <Link to={`/Customers/${Customer.id}`}>Ver detalhes</Link>
    </div>
  );
}
