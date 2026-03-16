import React from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment"; 
import GroupIcon from "@mui/icons-material/Group"; 
import SecurityIcon from "@mui/icons-material/Security"; 
import VpnKeyIcon from "@mui/icons-material/VpnKey"; 
import LogoutIcon from "@mui/icons-material/Logout";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import { Link, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "rgba(0, 8, 81, 0.85) !important",
  backdropFilter: "blur(20px)",
  color: "white",
  borderRight: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "10px 0 30px rgba(0,0,0,0.2)",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  background: "rgba(0, 8, 81, 0.9) !important",
  backdropFilter: "blur(20px)",
  color: "white",
  borderRight: "1px solid rgba(255, 255, 255, 0.1)",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1.5),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
      ...(open ? openedMixin(theme) : closedMixin(theme)),
    "& .MuiDrawer-paper": closedMixin(theme),
    
  }),
  
}));

export default function SidebarComponent({ open, handleDrawerOpen, handleDrawerClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
    setTimeout(() => {
      alert("Logged out successfully!");
    }, 100);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, to: "/dashboard" }, 
    { text: "Tasks", icon: <AssignmentIcon />, to: "/dashboard/tasks" }, 
    { text: "Users", icon: <GroupIcon />, to: "/dashboard/users-table" },
    { text: "Roles", icon: <SecurityIcon />, to: "/dashboard/roles" },
    { text: "Permissions", icon: <VpnKeyIcon />, to: "/dashboard/permission" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ justifyContent: open ? "space-between" : "center" }}>
          {open && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, opacity: 1, transition: "0.2s" }}>
              <ChecklistRtlIcon sx={{ fontSize: 32, color: "#1CB5E0" }} />
              <Typography variant="h6" fontWeight={800} letterSpacing="1px" sx={{ 
                background: "linear-gradient(90deg, #1CB5E0 0%, #fff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                TODO FLOW
              </Typography>
            </Box>
          )}
          <IconButton 
            onClick={open ? handleDrawerClose : handleDrawerOpen} 
            sx={{ 
              color: "rgba(255,255,255,0.7)", 
              "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.1)" } 
            }}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
        
        <List sx={{ px: 1, py: 1 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <ListItem key={item.text} disablePadding sx={{ display: "block", mb: 0.2 }}>
                <Tooltip title={!open ? item.text : ""} placement="right">
                  <ListItemButton
                    component={Link}
                    to={item.to}
                    sx={{
                      minHeight: 44,
                      justifyContent: open ? "initial" : "center",
                      px: 1.5,
                      borderRadius: "10px",
                      backgroundColor: isActive ? alpha("#1CB5E0", 0.15) : "transparent",
                      color: isActive ? "#1CB5E0" : "rgba(255,255,255,0.7)",
                      "&:hover": {
                        backgroundColor: isActive ? alpha("#1CB5E0", 0.2) : "rgba(255, 255, 255, 0.05)",
                        color: "#fff",
                        "& .MuiListItemIcon-root": { color: "#1CB5E0" }
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 1.5 : "auto",
                        justifyContent: "center",
                        color: isActive ? "#1CB5E0" : "rgba(255,255,255,0.7)",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      sx={{ opacity: open ? 1 : 0 }} 
                      primaryTypographyProps={{ 
                        fontSize: "0.85rem", 
                        fontWeight: isActive ? 700 : 500,
                        letterSpacing: "0.3px"
                      }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ mt: "auto", px: 1.5, pb: 2 }}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 1 }} />
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2,
                borderRadius: "12px",
                color: "rgba(255,255,255,0.7)",
                "&:hover": {
                  backgroundColor: "rgba(231, 76, 60, 0.1)",
                  color: "#e74c3c",
                  "& .MuiListItemIcon-root": { color: "#e74c3c" }
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center", color: "inherit" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
    </Box>
  );
}
