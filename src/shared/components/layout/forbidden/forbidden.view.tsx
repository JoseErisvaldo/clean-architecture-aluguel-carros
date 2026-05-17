import Img403 from "@/assets/image-people-403.svg";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function Forbidden() {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Box
          component="img"
          src={Img403}
          alt="403"
          sx={{
            width: "100%",
            maxWidth: 600,
            mb: 4,
          }}
        />

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Acesso negado
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          Você não tem permissão para acessar esta página.
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Caso você acredite que isso seja um erro, entre em contato com o
          suporte.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained">Voltar</Button>

          <Button variant="text">Falar com suporte</Button>
        </Stack>
      </Box>
    </Container>
  );
}
