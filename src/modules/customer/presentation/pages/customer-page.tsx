import { useNavigate } from "react-router-dom";

import ContainerLayout from "../../../../shared/components/layout/container/contaier.view";
import { PageHeader } from "../../../../shared/components/layout/page-header/page-header";
import { CustomerDataGrid } from "../components/customer-card";
import { useCustomers } from "../hooks/use-customer";

export function CustomersPage() {
  const navigate = useNavigate();

  const { Customers, loading, error } = useCustomers();
  const customersList = Array.isArray(Customers) ? Customers : [];

  return (
    <ContainerLayout>
      <PageHeader
        title="Clientes"
        subheader="Gerencie os clientes cadastrados no sistema"
        slotProps={{
          breadcrumb: {
            items: [
              { title: "Inicio", segment: "/" },
              { title: "Clientes", segment: "/customers" },
            ],
            router: {
              navigate: (to) => navigate(to),
            },
          },
        }}
      />

      <CustomerDataGrid
        customers={customersList}
        loading={loading}
        error={error}
        onRetry={() => {}}
      />
    </ContainerLayout>
  );
}
