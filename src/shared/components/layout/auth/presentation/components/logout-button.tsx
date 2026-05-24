import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

export function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Button
      fullWidth
      color="inherit"
      onClick={handleLogout}
      sx={{
        fontWeight: 600,
        textTransform: "none",
        border: "1px solid",
        borderColor: "primary.main",
        "&:hover": {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          borderColor: "primary.main",
        },
        cursor: "pointer",
      }}
    >
      Sair
    </Button>
  );
}
