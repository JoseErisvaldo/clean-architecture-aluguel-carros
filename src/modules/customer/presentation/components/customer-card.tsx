import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Customer } from "../../domain/entities/customer";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getCustomerColumns } from "../config/columns";
import { DataGridErrorOverlay } from "../../../../shared/components/ui/data-grid-error-overlay";

type Props = {
  customers: Customer[];
  loading: boolean;
  error?: boolean | null;
  onRetry?: () => void;
};

export function CustomerDataGrid({
  customers,
  loading,
  error,
  onRetry,
}: Props) {
  const navigate = useNavigate();

  const columns = useMemo(
    () =>
      getCustomerColumns({
        onNavigate: (id) => navigate(`/customers/${id}`),
      }),
    [navigate],
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: 600,
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <DataGrid
        rows={customers}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        slots={{
          noRowsOverlay: () =>
            error ? (
              <DataGridErrorOverlay
                message="Erro ao carregar clientes"
                onRetry={onRetry}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "text.secondary",
                }}
              >
                Nenhum cliente encontrado
              </Box>
            ),
        }}
      />
    </Box>
  );
}
