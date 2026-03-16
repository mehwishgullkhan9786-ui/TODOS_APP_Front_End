import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GavelIcon from "@mui/icons-material/Gavel";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIconOutlined from "@mui/icons-material/Login";

const settings = [
  { name: "Profile", icon: <PersonIcon fontSize="small" /> },
  { name: "Account", icon: <AccountCircleIcon fontSize="small" /> },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  transition: "all 0.3s ease",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "8ch",
      "&:focus": {
        width: "12ch",
      },
    },
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "16ch",
      },
    },
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: 600,
  margin: theme.spacing(0, 1),
  position: "relative",
  textTransform: "none",
  fontSize: "1rem",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "0%",
    height: "2px",
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#fff",
    transition: "width 0.3s ease",
  },
  "&:hover": {
    backgroundColor: "transparent",
    "&::after": {
      width: "80%",
    },
  },
}));

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElUserMgmt, setAnchorElUserMgmt] = React.useState(null);
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")) || {});

  React.useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")) || {});
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const isAuthenticated = !!localStorage.getItem("token");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenUserMgmt = (event) => {
    setAnchorElUserMgmt(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseUserMgmt = () => {
    setAnchorElUserMgmt(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    handleCloseUserMenu();
    setTimeout(() => {
      alert("Logged out successfully!");
    }, 100);
  };

  const navLinks = isAuthenticated 
    ? [
        { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
        { name: "Users", path: "/dashboard/users-table", icon: <GroupAddIcon /> },
        { name: "Roles", path: "/dashboard/roles", icon: <GavelIcon /> },
        { name: "Permissions", path: "/dashboard/permission", icon: <VpnKeyIcon /> },
      ]
    : [
        { name: "Home", path: "/", icon: <HomeIcon /> },
        { name: "About Us", path: "/about", icon: <InfoIcon /> },
        { name: "Contact", path: "/contact", icon: <ContactSupportIcon /> },
        { name: "Login", path: "/login", icon: <LoginIconOutlined /> },
        { name: "Sign Up", path: "/signup", icon: <AppRegistrationIcon /> },
      ];

  const drawer = (
    <Box onClick={handleCloseNavMenu} sx={{ textAlign: 'center', width: 250, p: 2 }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 800, color: '#000851' }}>
        TODO FLOW
      </Typography>
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItem 
            key={item.name} 
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <Button
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                px: 3,
                py: 1.5,
                color: '#2c3e50',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { bgcolor: alpha('#1CB5E0', 0.1) }
              }}
              startIcon={item.icon}
            >
              {item.name}
            </Button>
          </ListItem>
        ))}
        {isAuthenticated && (
          <ListItem disablePadding onClick={handleLogout}>
             <Button
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                px: 3,
                py: 1.5,
                color: 'error.main',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { bgcolor: alpha('#f44336', 0.1) }
              }}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </ListItem>
        )}
      </List>
    </Box>
  );
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 5 } }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: "80px",
            px: { xs: 1, sm: 2, md: 0 },
            width: "100%",
          }}
        >
       
          <ChecklistRtlIcon sx={{ mr: 1, fontSize: 32 }} />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            sx={{
              mr: { xs: 2, md: 10 },
              display: "flex",
              flexGrow: { xs: 1, md: 0 },
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              letterSpacing: { xs: "0rem", sm: ".1rem" },
              color: "inherit",
              textDecoration: "none",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.5rem" },
            }}
          >
            TODO FLOW
          </Typography>

          {/* Desktop Navigation Links */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 4,
            }}
          >
            {isAuthenticated ? (
              <>
                <NavButton onClick={() => navigate("/dashboard")}>
                  Dashboard
                </NavButton>

                <Box>
                  <NavButton
                    onClick={handleOpenUserMgmt}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    User Management
                  </NavButton>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar-usermgmt"
                    anchorEl={anchorElUserMgmt}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    open={Boolean(anchorElUserMgmt)}
                    onClose={handleCloseUserMgmt}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        borderRadius: "12px",
                        minWidth: "180px",
                        mt: 1.5,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/dashboard/users-table");
                        handleCloseUserMgmt();
                      }}
                    >
                      Users
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/dashboard/roles");
                        handleCloseUserMgmt();
                      }}
                    >
                      Roles
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/dashboard/permission");
                        handleCloseUserMgmt();
                      }}
                    >
                      Permissions
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <NavButton onClick={() => navigate("/")}>Home</NavButton>
                <NavButton onClick={() => navigate("/about")}>
                  About Us
                </NavButton>
                <NavButton onClick={() => navigate("/contact")}>
                  Contact
                </NavButton>
              </>
            )}
          </Box>

          {/* Mobile Menu Button + Drawer */}
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <IconButton
              size="large"
              aria-label="open drawer"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
              }}
            >
              {drawer}
            </Drawer>
          </Box>

          {/* Right Section: Search & User Account */}
          {isAuthenticated ? (
            <>
              <Search
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  width: { xs: "auto", sm: "100%" },
                  maxWidth: { xs: "140px", sm: "300px" },
                  mr: { xs: 2, sm: 4 },
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                  sx={{ width: "100%" }}
                />
              </Search>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, border: "2px solid rgba(255,255,255,0.5)" }}
                  >
                    <Avatar
                      src={user.profileImage ? `http://localhost:5000${user.profileImage}` : ""}
                      sx={{ bgcolor: "#764ba2" }}
                    >
                      {user.name ? user.name.charAt(0) : "U"}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "55px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    elevation: 4,
                    sx: {
                      borderRadius: "16px",
                      minWidth: "200px",
                      overflow: "visible",
                      filter: "drop-shadow(0px 4px 15px rgba(0,0,0,0.1))",
                      mt: 1.5,
                      "& .MuiMenuItem-root": {
                        padding: "12px 20px",
                        fontWeight: 500,
                      },
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      User Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Manage your settings
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 1 }} />
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting.name === "Profile") {
                          navigate("/dashboard/profile");
                        } else if (setting.name === "Account") {
                          navigate("/dashboard/account");
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: "primary.main" }}>
                        {setting.icon}
                      </ListItemIcon>
                      {setting.name}
                    </MenuItem>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                    <ListItemIcon sx={{ color: "error.main" }}>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1.5,
                alignItems: "center",
              }}
            >
              <Button
                variant="text"
                color="inherit"
                onClick={() => navigate("/login")}
                sx={{
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/signup")}
                sx={{
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",
                  borderColor: "rgba(255,255,255,0.7)",
                  "&:hover": {
                    borderColor: "#fff",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  borderRadius: "20px",
                  px: 3,
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
