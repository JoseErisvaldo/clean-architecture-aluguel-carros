import { Box, Typography, Button } from "@mui/material";

type Props = {
  message: string;
  onRetry?: () => void;
};

export function DataGridErrorOverlay({ message, onRetry }: Props) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Typography variant="h6" color="error">
        Ocorreu um erro
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>

      {onRetry && (
        <Button variant="contained" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </Box>
  );
}
