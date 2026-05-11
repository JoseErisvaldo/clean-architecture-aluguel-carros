import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/use-login";
import { useAuth } from "../../../../shared/auth/presentation/hooks/use-auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";
  const { refreshAuth } = useAuth();
  const { login } = useLogin();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await login({ email, password });
      refreshAuth();
      navigate(from, { replace: true });
    } catch {
      setError("Falha no login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 360,
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
        >
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Senha"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, py: 1.2 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        {error && (
          <Typography
            variant="body2"
            color="error"
            sx={{ textAlign: "center", mt: 2 }}
          >
            {error}
          </Typography>
        )}

        <Typography
          variant="body2"
          sx={{ textAlign: "center", mt: 2 }}
          color="text.secondary"
        >
          Esqueceu sua senha?
        </Typography>
      </Paper>
    </Box>
  );
}
