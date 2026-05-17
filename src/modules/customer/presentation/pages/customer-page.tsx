import { useNavigate } from "react-router-dom";

import ContainerLayout from "../../../../shared/components/layout/container/contaier.view";
import { PageHeader } from "../../../../shared/components/layout/page-header/page-header";
import { CustomerDataGrid } from "../components/customer-card";
import { useCustomers } from "../hooks/use-customer";

import { Alert, Box, CircularProgress, Typography } from "@mui/material";

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
            items: [{ title: "Clientes", segment: "/customers" }],
            router: {
              navigate: (to) => navigate(to),
            },
          },
        }}
      />

      {loading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CircularProgress size={20} />
          <Typography>Carregando clientes...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Box sx={{ mt: 2, width: "100%", minWidth: 0 }}>
          <CustomerDataGrid customers={customersList} />
        </Box>
      )}
    </ContainerLayout>
  );
}
