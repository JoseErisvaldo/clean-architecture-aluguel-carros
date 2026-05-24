import type { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { StatusCars } from "../../../../shared/components/ui/status-cars";
import { formatDateHour } from "../../../../shared/helper/date/format-date-hour";

type Params = {
  onNavigate: (id: string | number) => void;
};

export const getCarsColumns = ({ onNavigate }: Params): GridColDef[] => [
  {
    field: "brand",
    headerName: "Marca",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "model",
    headerName: "Modelo",
    flex: 1,
    minWidth: 180,
  },
  {
    field: "plate",
    headerName: "Placa",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "year",
    headerName: "Ano",
    type: "number",
    width: 100,
  },
  {
    field: "daily_price",
    headerName: "Preço/dia",
    flex: 1,
    minWidth: 130,
    renderCell: (params) => {
      const value = params.value as number;

      return (
        <span>
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 140,
    renderCell: (params) => {
      return <StatusCars params={{ value: params.value }} />;
    },
  },
  {
    field: "created_at",
    headerName: "Criado em",
    flex: 1,
    minWidth: 180,
    renderCell: (params) => {
      const value = params.value as string;
      return <span>{formatDateHour(value)}</span>;
    },
  },
  {
    field: "actions",
    headerName: "Ações",
    sortable: false,
    width: 140,
    renderCell: (params) => (
      <Box
        sx={{
          cursor: "pointer",
          color: "primary.main",
          fontWeight: 600,
        }}
        onClick={() => onNavigate(params.row.id)}
      >
        Ver detalhes
      </Box>
    ),
  },
];
