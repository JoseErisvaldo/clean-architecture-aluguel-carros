import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Customer } from "../../domain/entities/customer";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getCustomerColumns } from "../config/columns";

type Props = {
  customers: Customer[];
};

export function CustomerDataGrid({ customers }: Props) {
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
      />
    </Box>
  );
}
