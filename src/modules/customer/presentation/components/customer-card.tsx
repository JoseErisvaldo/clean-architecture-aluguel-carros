import { Link as RouterLink } from "react-router";
import type { Customer } from "../../domain/entities/customer";
import { Card, CardContent, Typography, Link, Box } from "@mui/material";

export function CustomerCard({ Customer }: { Customer: Customer }) {
  return (
    <Card elevation={2} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
          {Customer.name}
        </Typography>

        <Box>
          <Link
            component={RouterLink}
            to={`/customers/${Customer.id}`}
            underline="hover"
          >
            Ver detalhes
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
