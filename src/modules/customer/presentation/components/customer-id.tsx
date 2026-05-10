import { Link, useParams } from "react-router";
import { useCustomerById } from "../hooks/use-customer";

export default function CustomerId() {
  const { id } = useParams<{ id: string }>();
  const data = useCustomerById(id ?? "");

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 10 }}>
      <Link to="/">Voltar</Link>
      <h3>Customer ID: {id}</h3>
      {data.loading && <p>Carregando cliente...</p>}
      {data.error && <p>{data.error}</p>}
      {data && data.Customer && (
        <div>
          <p>Name: {data.Customer.name}</p>
        </div>
      )}
    </div>
  );
}
