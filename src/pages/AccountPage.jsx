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
  Divider,
  alpha,
} from "@mui/material";
import {
  Lock,
  Visibility,
  VisibilityOff,
  Email,
  Badge,
  Security,
} from "@mui/icons-material";
import axios from "axios";

const meshGradient =
  "radial-gradient(at 0% 0%, rgba(10, 89, 192, 0.8) 0, transparent 50%), radial-gradient(at 50% 0%, rgba(28, 181, 224, 0.6) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(0, 8, 81, 0.9) 0, transparent 50%), linear-gradient(135deg, #0a59c0ff 0%, #000851 100%)";

const AccountPage = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/auth/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade in timeout={800}>
      <Box sx={{ p: { xs: 2, md: 5 }, minHeight: "100vh", background: "transparent" }}>
        <Paper
          sx={{
            maxWidth: "700px",
            mx: "auto",
            borderRadius: "32px",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
          }}
        >
         
          <Box sx={{ p: 4, background: meshGradient, color: "#fff" }}>
            <Typography variant="h5" fontWeight={900}>
              Account Management
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Security and authentication settings for your account
            </Typography>
          </Box>

          <Box sx={{ p: { xs: 3, md: 5 } }}>
          
            <Typography variant="h6" fontWeight={800} sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
              <Badge color="primary" /> Public Information
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3, mb: 5 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  REGISTERED EMAIL
                </Typography>
                <Typography variant="body1" fontWeight={600} sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                  <Email fontSize="small" color="disabled" /> {user.email}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  ACCOUNT ROLE
                </Typography>
                <Typography variant="body1" fontWeight={600} sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                  <Security fontSize="small" color="disabled" /> {user.role}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 5 }} />

         
            <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
              Change Password
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Strengthen your security with a unique password.
            </Typography>

            <form onSubmit={handlePasswordChange}>
              <Box sx={{ display: "grid", gap: 3, mb: 4 }}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type={showPasswords ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="disabled" fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton onClick={() => setShowPasswords(!showPasswords)} size="small">
                        {showPasswords ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                    sx: { borderRadius: "16px" },
                  }}
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type={showPasswords ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="disabled" fontSize="small" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: "16px" },
                  }}
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type={showPasswords ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="disabled" fontSize="small" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: "16px" },
                  }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: "16px",
                  fontWeight: 900,
                  textTransform: "none",
                  background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
                  boxShadow: "0 10px 20px rgba(28, 181, 224, 0.2)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 30px rgba(28, 181, 224, 0.3)",
                  },
                }}
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default AccountPage;
