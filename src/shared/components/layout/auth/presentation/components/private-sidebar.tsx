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
    return pathname === "/" || pathname.startsWith("/Customers");
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
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Painel
        </Typography>
      </Toolbar>

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
                "&.Mui-selected": {
                  backgroundColor: "action.selected",
                },
              }}
            >
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
