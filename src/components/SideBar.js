import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
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
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment"; 
import GroupIcon from "@mui/icons-material/Group"; 
import SecurityIcon from "@mui/icons-material/Security"; 
import VpnKeyIcon from "@mui/icons-material/VpnKey"; 
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "linear-gradient(180deg, #1CB5E0 0%, #000851 100%)", 
  color: "white",
  borderRight: "none",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background: "linear-gradient(180deg, #1CB5E0 0%, #000851 100%)",
  color: "white",
  borderRight: "none",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

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
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SidebarComponent({ open, handleDrawerOpen, handleDrawerClose }) {
  const theme = useTheme();
const navigate = useNavigate(); 

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


const authItems = [
  { text: "Logout", icon: <LoginIcon />, action: handleLogout },
];



  return (
    <Box sx={{ display: "flex", position:"fixed" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} sx={{ position:"fixed" }}>
        <DrawerHeader>
            {!open ? (
             <IconButton onClick={handleDrawerOpen} sx={{ color: "white" }}>
                <ChevronRightIcon /> 
             </IconButton>
            ) : (
             <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
            )}
         
        </DrawerHeader>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
        
       
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
              component={Link}
                to={item.to}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)", 
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />

     
        <List>
          {authItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
              onClick={item.action}
                component={item.to ? Link : "div"}
                to={item.to}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover": {
                     backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                    primaryTypographyProps={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
