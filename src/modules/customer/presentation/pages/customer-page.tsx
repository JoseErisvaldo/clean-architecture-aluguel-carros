import { useNavigate } from "react-router-dom";

import ContainerLayout from "../../../../shared/components/layout/container/contaier.view";
import { PageHeader } from "../../../../shared/components/layout/page-header/page-header";
import { CustomerDataGrid } from "../components/customer-card";
import { useCustomersQuery } from "../queries/use-customers-query";

export function CustomersPage() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useCustomersQuery();
  console.log("data", data);
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
        customers={data || []}
        loading={isLoading}
        error={isError}
        onRetry={() => {}}
      />
    </ContainerLayout>
  );
}
