import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import { useCarById } from "../../hooks/use-cars";
import CarDetailsSkeleton from "./car-details-skeleton";
import { formatDateHour } from "../../../../../shared/helper/date/format-date-hour";

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        background: "#fafafa",
        border: "1px solid #eee",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight={600}>{value ?? "-"}</Typography>
    </Box>
  );
}

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();

  const { Car, loading } = useCarById(id ?? "");

  if (loading) {
    return <CarDetailsSkeleton />;
  }

  if (!Car) {
    return <Alert severity="error">Carro não encontrado</Alert>;
  }

  const isAvailable = Car.status === "available";

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Card
        sx={{
          width: "100%",
          border: "10px solid grey.500",
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {Car.brand} {Car.model}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Placa: {Car.plate}
              </Typography>
            </Box>

            <Chip
              label={isAvailable ? "Disponível" : "Indisponível"}
              color={isAvailable ? "success" : "error"}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            <Info label="Marca" value={Car.brand} />
            <Info label="Modelo" value={Car.model} />
            <Info label="Ano" value={Car.year} />
            <Info label="Placa" value={Car.plate} />
            <Info label="Preço/dia" value={`R$ ${Car.daily_price}`} />
            <Info label="Criado em" value={formatDateHour(Car.created_at)} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
