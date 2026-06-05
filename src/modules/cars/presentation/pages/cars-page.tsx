import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ContainerLayout from "../../../../shared/components/layout/container/contaier.view";
import { PageHeader } from "../../../../shared/components/layout/page-header/page-header";
import { CarsDataGrid } from "../components/cars-table";
import { Button } from "@mui/material";
import DrawerNewCar from "../components/drawer-new-car/drawer-new-car";
import useCarsQueries from "../queries/use-cars";

export function CarsPage() {
  const navigate = useNavigate();
  const { data: cars, isLoading, isError, refetch } = useCarsQueries();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => setOpenDrawer(true);
  const handleCloseDrawer = () => setOpenDrawer(false);

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
      >
        <Button variant="contained" onClick={handleOpenDrawer}>
          Novo Carro
        </Button>
      </PageHeader>

      <CarsDataGrid
        cars={cars}
        loading={isLoading}
        error={isError}
        onRetry={refetch}
      />
      <DrawerNewCar
        openDrawer={openDrawer}
        handleCloseDrawer={handleCloseDrawer}
        title="Novo Carro"
        onSuccess={refetch}
      />
    </ContainerLayout>
  );
}
