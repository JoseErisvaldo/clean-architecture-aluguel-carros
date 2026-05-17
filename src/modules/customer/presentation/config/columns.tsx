import type { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

type Params = {
  onNavigate: (id: string | number) => void;
};

export const getCustomerColumns = ({ onNavigate }: Params): GridColDef[] => [
  {
    field: "name",
    headerName: "Nome",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 220,
  },
  {
    field: "phone",
    headerName: "Telefone",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "document",
    headerName: "Documento",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "actions",
    headerName: "Ações",
    sortable: false,
    width: 160,
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
