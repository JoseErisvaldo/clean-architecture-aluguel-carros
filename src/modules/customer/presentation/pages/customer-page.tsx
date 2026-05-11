import { CustomerCard } from "../components/customer-card";
import { useCustomers } from "../hooks/use-customer";

export function CustomersPage() {
  const { Customers, loading, error } = useCustomers();
  const customersList = Array.isArray(Customers) ? Customers : [];

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Clientes</h1>

      {loading && <p>Carregando clientes...</p>}
      {error && <p>{error}</p>}

      {!loading &&
        !error &&
        customersList.map((Customer) => (
          <CustomerCard key={Customer.id} Customer={Customer} />
        ))}
    </div>
  );
}
