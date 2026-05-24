import { Box, CircularProgress, Typography } from "@mui/material";

export function Loading({ title }: { title: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <CircularProgress size={20} />
      <Typography>{title}</Typography>
    </Box>
  );
}
