import { useParams } from "react-router";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useCustomerByIdQuery } from "../queries/use-customer-by-id";

export default function CustomerId() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useCustomerByIdQuery(id ?? "");

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 3 }}>
        {isLoading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CircularProgress size={20} />
            <Typography>Carregando cliente...</Typography>
          </Box>
        )}

        {isError && (
          <Typography color="error">Erro ao carregar cliente</Typography>
        )}

        {data && !isLoading && !isError && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              <strong>Nome:</strong> {data.name}
            </Typography>

            <Typography variant="body1">
              <strong>Email:</strong> {data.email}
            </Typography>

            <Typography variant="body1">
              <strong>Telefone:</strong> {data.phone}
            </Typography>

            <Typography variant="body1">
              <strong>Documento:</strong> {data.document}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Criado em: {new Date(data.created_at).toLocaleString()}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
