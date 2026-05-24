import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { LogoutButton } from "./logout-button";

import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const DRAWER_WIDTH = 260;

interface PrivateSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  desktopOpen: boolean;
}

const navigationItems = [
  { label: "Clientes", to: "/", icon: <PeopleIcon /> },
  { label: "Carros", to: "/cars", icon: <DirectionsCarIcon /> },
];

function isItemActive(pathname: string, to: string) {
  if (to === "/") {
    return pathname === "/" || pathname.startsWith("/customers");
  }
  return pathname.startsWith(to);
}

export function PrivateSidebar({
  mobileOpen,
  onCloseMobile,
  desktopOpen,
}: PrivateSidebarProps) {
  const location = useLocation();

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Gestor de Frotas
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Operações de aluguel de carros
        </Typography>
      </Box>

      <Divider />

      <List sx={{ flex: 1, px: 1 }}>
        {navigationItems.map((item) => {
          const active = isItemActive(location.pathname, item.to);

          return (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              selected={active}
              onClick={onCloseMobile}
              sx={{
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
                gap: 1,
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "primary.main",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? "inherit" : "text.secondary",
                  minWidth: 36,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: { fontWeight: active ? 600 : 400 },
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ p: 2 }}>
        <LogoutButton />
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onCloseMobile}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: desktopOpen ? "block" : "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export { DRAWER_WIDTH };
