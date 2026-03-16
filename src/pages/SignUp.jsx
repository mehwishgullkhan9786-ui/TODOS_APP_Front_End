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
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });
      console.log(response);

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      alert("SignUp Failed! Try Again");
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
        py: { xs: 8, md: 4 },
        px: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
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
          bottom: "-5%",
          right: "-5%",
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
            maxWidth: "500px",
            p: { xs: 4, sm: 6 },
            borderRadius: "32px",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 25px 50px rgba(0, 8, 81, 0.1)",
            zIndex: 1,
            my: 4,
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
            Create Account
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              mb: 4,
              fontWeight: 500,
            }}
          >
            Join us to manage your tasks effortlessly
          </Typography>

          <form onSubmit={handleSignUp}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="dense"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#1CB5E0" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "rgba(255,255,255,0.5)",
                },
              }}
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              margin="dense"
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
                mb: 2,
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
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 2,
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
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              margin="dense"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              Sign Up
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
            Already have an account?{" "}
            <MuiLink
              component={Link}
              to="/login"
              sx={{
                color: "#1CB5E0",
                fontWeight: 700,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Login
            </MuiLink>
          </Typography>
        </Paper>
      </Fade>
    </Box>
  );
}

export default SignUp;
