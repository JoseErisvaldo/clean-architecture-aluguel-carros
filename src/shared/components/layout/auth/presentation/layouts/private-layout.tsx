import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DRAWER_WIDTH, PrivateSidebar } from "../components/private-sidebar";

export function PrivateLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);

  const desktopDrawerWidth = desktopOpen ? DRAWER_WIDTH : 0;

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);
  const toggleDesktop = () => setDesktopOpen((prev) => !prev);

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
          transition: "all 0.2s ease",
        }}
      >
        <Toolbar>
          <IconButton
            onClick={toggleDesktop}
            aria-label={
              desktopOpen ? "Fechar menu lateral" : "Abrir menu lateral"
            }
            sx={{ mr: 1, display: { xs: "none", md: "inline-flex" } }}
          >
            <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
              {desktopOpen ? "❮" : "❯"}
            </Typography>
          </IconButton>

          <IconButton
            edge="start"
            onClick={toggleMobile}
            aria-label="Abrir menu"
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <Typography sx={{ fontSize: 20, fontWeight: 700 }}>≡</Typography>
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Aluguel de carros
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { xs: 0, md: desktopDrawerWidth },
          flexShrink: { md: 0 },
          transition: "width 0.2s ease",
        }}
      >
        <PrivateSidebar
          mobileOpen={mobileOpen}
          onCloseMobile={closeMobile}
          desktopOpen={desktopOpen}
        />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          mt: "64px",
          width: { md: `calc(100% - ${desktopDrawerWidth}px)` },
          transition: "all 0.2s ease",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
