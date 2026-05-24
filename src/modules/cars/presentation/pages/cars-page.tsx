import { useNavigate } from "react-router-dom";

import ContainerLayout from "../../../../shared/components/layout/container/contaier.view";
import { PageHeader } from "../../../../shared/components/layout/page-header/page-header";
import { CarsDataGrid } from "../components/cars-table";
import { useCars } from "../hooks/use-cars";
import { Box } from "@mui/material";

export function CarsPage() {
  const navigate = useNavigate();
  const { Cars, loading, error, fetchCars } = useCars();

  return (
    <ContainerLayout>
      <PageHeader
        title="Carros"
        subheader="Gerencie os carros cadastrados no sistema"
        slotProps={{
          breadcrumb: {
            items: [
              { title: "Inicio", segment: "/" },
              { title: "Carros", segment: "/cars" },
            ],
            router: {
              navigate: (to) => navigate(to),
            },
          },
        }}
      />
      {}

      <CarsDataGrid
        cars={Cars}
        loading={loading}
        error={error}
        onRetry={fetchCars}
      />
    </ContainerLayout>
  );
}
