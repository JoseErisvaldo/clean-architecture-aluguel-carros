import { useNavigate, useParams } from "react-router-dom";

import ContainerLayout from "../../../../shared/components/layout/container/contaier.view";
import { PageHeader } from "../../../../shared/components/layout/page-header/page-header";
import CarDetails from "../components/car-details/car-details-id";

export default function CarsIdPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <ContainerLayout>
      <PageHeader
        title="Detalhes do Carro"
        subheader="Visualize as informações detalhadas do carro selecionado"
        slotProps={{
          breadcrumb: {
            items: [
              { title: "Inicio", segment: "/" },
              { title: "Carros", segment: "/cars" },
              {
                title: "Detalhes",
                segment: `/cars/${id ?? ""}`,
              },
            ],
            router: {
              navigate: (to) => navigate(to),
            },
          },
        }}
      />

      <CarDetails />
    </ContainerLayout>
  );
}
