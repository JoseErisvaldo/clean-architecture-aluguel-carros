import Img404 from "@/assets/image-people-404.svg";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src={Img404}
          alt="404"
          sx={{
            width: "100%",
            maxWidth: 600,
            mb: 4,
          }}
        />

        <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
          Página não encontrada
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          Oops! Parece que você se perdeu.
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          A página que você está tentando acessar não existe ou foi movida.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained">Voltar</Button>

          <Button variant="text">Falar com suporte</Button>
        </Stack>
      </Box>
    </Container>
  );
}
