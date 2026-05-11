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
    <Button fullWidth variant="outlined" color="inherit" onClick={handleLogout}>
      Sair
    </Button>
  );
}
