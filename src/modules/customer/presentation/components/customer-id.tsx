import { useParams } from "react-router";
import { useCustomerById } from "../hooks/use-customer";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";

export default function CustomerId() {
  const { id } = useParams<{ id: string }>();

  const { Customer, loading, error } = useCustomerById(id ?? "");

  console.log("CustomerId data:", { Customer, loading, error });

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 3 }}>
        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CircularProgress size={20} />
            <Typography>Carregando cliente...</Typography>
          </Box>
        )}

        {error && <Typography color="error">{error}</Typography>}

        {Customer && !loading && !error && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              <strong>Nome:</strong> {Customer.name}
            </Typography>

            <Typography variant="body1">
              <strong>Email:</strong> {Customer.email}
            </Typography>

            <Typography variant="body1">
              <strong>Telefone:</strong> {Customer.phone}
            </Typography>

            <Typography variant="body1">
              <strong>Documento:</strong> {Customer.document}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Criado em: {new Date(Customer.created_at).toLocaleString()}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
