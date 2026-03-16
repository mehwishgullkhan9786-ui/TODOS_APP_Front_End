import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Fade,
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter details");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("permissions", JSON.stringify(response.data.user.permissions));
        console.log("Session saved, moving to dashboard...");
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Login Failed: " + (err.response?.data?.message || "Error"));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f7ff 0%, #e0efff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        p: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: { xs: "300px", md: "500px" },
          height: { xs: "300px", md: "500px" },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(28, 181, 224, 0.15) 0%, rgba(28, 181, 224, 0) 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          left: "-5%",
          width: { xs: "250px", md: "400px" },
          height: { xs: "250px", md: "400px" },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 8, 81, 0.08) 0%, rgba(0, 8, 81, 0) 70%)",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />

      <Fade in timeout={1000}>
        <Paper
          elevation={20}
          sx={{
            width: "100%",
            maxWidth: "450px",
            p: { xs: 4, sm: 6 },
            borderRadius: "32px",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 25px 50px rgba(0, 8, 81, 0.1)",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              mb: 1.5,
              textAlign: "center",
              background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              mb: 5,
              fontWeight: 500,
            }}
          >
            Please login to your account
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#1CB5E0" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "rgba(255,255,255,0.5)",
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "rgba(255,255,255,0.5)",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#1CB5E0" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                py: 1.8,
                borderRadius: "16px",
                fontWeight: 800,
                fontSize: "1rem",
                textTransform: "none",
                // background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
                boxShadow: "0 10px 20px rgba(28, 181, 224, 0.3)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 15px 30px rgba(28, 181, 224, 0.4)",
                  background:
                    "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Sign In
            </Button>
          </form>

          <Typography
            sx={{
              textAlign: "center",
              mt: 4,
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            Don't have an account?{" "}
            <MuiLink
              component={Link}
              to="/signup"
              sx={{
                color: "#1CB5E0",
                fontWeight: 700,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Sign Up
            </MuiLink>
          </Typography>
        </Paper>
      </Fade>
    </Box>
  );
}

export default Login;
