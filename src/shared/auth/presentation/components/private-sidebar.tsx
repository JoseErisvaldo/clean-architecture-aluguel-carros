import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { LogoutButton } from "./logout-button";

const DRAWER_WIDTH = 260;

interface PrivateSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  desktopOpen: boolean;
}

const navigationItems = [{ label: "Clientes", to: "/" }];

function isItemActive(pathname: string, to: string) {
  if (to === "/") {
    return pathname === "/" || pathname.startsWith("/Customers/");
  }

  return pathname.startsWith(to);
}

export function PrivateSidebar({
  mobileOpen,
  onCloseMobile,
  desktopOpen,
}: PrivateSidebarProps) {
  const location = useLocation();

  const content = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Painel
        </Typography>
      </Toolbar>
      <Divider />

      <List sx={{ flex: 1 }}>
        {navigationItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            selected={isItemActive(location.pathname, item.to)}
            onClick={onCloseMobile}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
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
        {content}
      </Drawer>

      <Drawer
        variant="permanent"
        open={desktopOpen}
        sx={{
          display: { xs: "none", md: desktopOpen ? "block" : "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        {content}
      </Drawer>
    </>
  );
}

export { DRAWER_WIDTH };
