import { useNavigate, useParams } from "react-router-dom";

import ContainerLayout from "../../../../shared/components/layout/container/contaier.view";
import { PageHeader } from "../../../../shared/components/layout/page-header/page-header";
import CustomerId from "../components/customer-id";

export default function CustomersIdPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <ContainerLayout>
      <PageHeader
        title="Detalhes do Cliente"
        subheader="Visualize as informações detalhadas do cliente selecionado"
        slotProps={{
          breadcrumb: {
            items: [
              { title: "Clientes", segment: "/customers" },
              {
                title: "Detalhes",
                segment: `/customers/${id ?? ""}`,
              },
            ],
            router: {
              navigate: (to) => navigate(to),
            },
          },
          action: {
            label: "Voltar",
            onClick: () => navigate(-1),
          },
        }}
      />

      <CustomerId />
    </ContainerLayout>
  );
}
