import * as React from "react";
import { useNavigate } from "react-router-dom";
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

const settings = ["Profile", "Account", "Logout"];

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
    [theme.breakpoints.up("md")]: {
      width: "25ch",
      "&:focus": {
        width: "35ch",
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
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElUserMgmt, setAnchorElUserMgmt] = React.useState(null);

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

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)", // Deep Ocean Blue
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: "80px" }}>
          <ChecklistRtlIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 32 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            TODO FLOW
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/dashboard");
                  handleCloseNavMenu();
                }}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/dashboard/users-table");
                  handleCloseNavMenu();
                }}
              >
                Users Management
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/dashboard/roles");
                  handleCloseNavMenu();
                }}
              >
                Roles
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/dashboard/permission");
                  handleCloseNavMenu();
                }}
              >
                Permissions
              </MenuItem>
            </Menu>
          </Box>

          <ChecklistRtlIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TODO FLOW
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
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
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search tasks..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, border: "2px solid rgba(255,255,255,0.5)" }}
              >
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
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
                elevation: 3,
                sx: { borderRadius: "12px", minWidth: "150px" },
              }}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === "Logout" ? handleLogout : handleCloseUserMenu
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
