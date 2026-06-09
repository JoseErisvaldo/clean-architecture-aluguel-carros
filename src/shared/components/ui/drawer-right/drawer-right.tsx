import { Box, Button, Drawer, Divider, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DrawerNewCarProps {
  openDrawer: boolean;
  handleCloseDrawer: () => void;
  children: React.ReactNode;
  title: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  //error?: string | null;
  //success?: boolean;
}

export default function DrawerRight({
  openDrawer,
  handleCloseDrawer,
  children,
  title,
  onSubmit,
  loading,
  //error,
  //success,
}: DrawerNewCarProps) {
  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={handleCloseDrawer}
      PaperProps={{
        sx: {
          width: 300,
        },
      }}
    >
      <Box p={2}>
        <h3>{title}</h3>
      </Box>
      <Divider />
      <Box
        component="form"
        id="drawer-form"
        onSubmit={onSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
        p={2}
        sx={{ flex: 1, overflowY: "auto" }}
      >
        {children}
      </Box>
      <Divider />
      {/*{error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert severity="success">Operação realizada com sucesso!</Alert>
      )}
      */}
      <Box p={2} display="flex" gap={2}>
        <Button
          onClick={handleCloseDrawer}
          variant="outlined"
          startIcon={<CloseIcon />}
          fullWidth
          disabled={loading}
        >
          Fechar
        </Button>

        <Button
          type="submit"
          form="drawer-form"
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </Box>
    </Drawer>
  );
}
