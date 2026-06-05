import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { Cars } from "../../domain/entities/cars";
import { getCarsColumns } from "../config/column";
import { DataGridErrorOverlay } from "../../../../shared/components/ui/data-grid-error-overlay";

type Props = {
  cars: Cars[] | undefined;
  loading?: boolean;
  error?: boolean | string;
  onRetry?: () => void;
};

export function CarsDataGrid({ cars, loading, error, onRetry }: Props) {
  const navigate = useNavigate();

  const columns = useMemo(
    () =>
      getCarsColumns({
        onNavigate: (id) => navigate(`/cars/${id}`),
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
        rows={cars}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        loading={loading}
        slots={{
          noRowsOverlay: () =>
            error ? (
              <DataGridErrorOverlay
                message={typeof error === "string" ? error : "Ocorreu um erro"}
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
                Nenhum carro encontrado
              </Box>
            ),
        }}
      />
    </Box>
  );
}
