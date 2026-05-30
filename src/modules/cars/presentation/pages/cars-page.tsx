import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import ContainerLayout from "../../../../shared/components/layout/container/contaier.view";
import { PageHeader } from "../../../../shared/components/layout/page-header/page-header";
import { CarsDataGrid } from "../components/cars-table";
import { useCars } from "../hooks/use-cars";
import { Button } from "@mui/material";
import DrawerNewCar from "../components/drawer-new-car/drawer-new-car";

export function CarsPage() {
  const navigate = useNavigate();
  const { Cars, loading, error, fetchCars } = useCars();

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => setOpenDrawer(true);
  const handleCloseDrawer = () => setOpenDrawer(false);
  const handleCreateCarSuccess = useCallback(() => {
    fetchCars();
  }, [fetchCars]);

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
        cars={Cars}
        loading={loading}
        error={error}
        onRetry={fetchCars}
      />
      <DrawerNewCar
        openDrawer={openDrawer}
        handleCloseDrawer={handleCloseDrawer}
        title="Novo Carro"
        onSuccess={handleCreateCarSuccess}
      />
    </ContainerLayout>
  );
}
