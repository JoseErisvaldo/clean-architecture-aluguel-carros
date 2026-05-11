import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DRAWER_WIDTH, PrivateSidebar } from "../components/private-sidebar";

export function PrivateLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const desktopDrawerWidth = desktopOpen ? DRAWER_WIDTH : 0;

  const handleToggleMobile = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleToggleDesktop = () => {
    setDesktopOpen((prev) => !prev);
  };

  const handleCloseMobile = () => {
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f6f7fb" }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "1px solid #e7e8ef",
          width: { md: `calc(100% - ${desktopDrawerWidth}px)` },
          ml: { md: `${desktopDrawerWidth}px` },
          transition: "margin 0.2s ease, width 0.2s ease",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleToggleDesktop}
            aria-label={
              desktopOpen ? "Fechar menu lateral" : "Abrir menu lateral"
            }
            sx={{ mr: 1, display: { xs: "none", md: "inline-flex" } }}
          >
            <Box
              component="span"
              sx={{ fontSize: 20, fontWeight: 700, lineHeight: 1 }}
            >
              {desktopOpen ? "❮" : "❯"}
            </Box>
          </IconButton>

          <IconButton
            color="inherit"
            edge="start"
            onClick={handleToggleMobile}
            sx={{ mr: 2, display: { md: "none" } }}
            aria-label="Abrir menu"
          >
            <Box
              component="span"
              sx={{ fontSize: 20, fontWeight: 700, lineHeight: 1 }}
            >
              ≡
            </Box>
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Aluguel de carros
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { md: desktopDrawerWidth },
          flexShrink: { md: 0 },
          transition: "width 0.2s ease",
        }}
      >
        <PrivateSidebar
          mobileOpen={mobileOpen}
          onCloseMobile={handleCloseMobile}
          desktopOpen={desktopOpen}
        />
      </Box>

      <Box
        component="main"
        sx={{
          flex: 1,
          p: 3,
          width: { xs: "100%", md: `calc(100% - ${desktopDrawerWidth}px)` },
          mt: "64px",
          transition: "width 0.2s ease",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
