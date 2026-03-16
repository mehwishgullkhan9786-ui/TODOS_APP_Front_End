import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  IconButton,
  Fade,
  CircularProgress,
  alpha,
} from "@mui/material";
import { PhotoCamera, Save, Badge, Email } from "@mui/icons-material";
import axios from "axios";

const meshGradient =
  "radial-gradient(at 0% 0%, rgba(10, 89, 192, 0.8) 0, transparent 50%), radial-gradient(at 50% 0%, rgba(28, 181, 224, 0.6) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(0, 8, 81, 0.9) 0, transparent 50%), linear-gradient(135deg, #0a59c0ff 0%, #000851 100%)";

const ProfilePage = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {},
  );
  const [name, setName] = useState(user.name || "");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(
    user.profileImage ? `http://localhost:5000${user.profileImage}` : "",
  );
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      console.log("Object URL created:", objectUrl);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    if (imageFile) {
      console.log("Appending image file to formData:", imageFile.name);
      formData.append("profileImage", imageFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const updatedUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("Profile updated successfully!");
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Profile update failed:", err);
      const errorMsg =
        err.response?.data?.message || "Failed to update profile";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          p: { xs: 2, md: 5 },
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "transparent",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "700px",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            borderRadius: "32px",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            p: { xs: 3, md: 6 },
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: meshGradient,
              opacity: 0.1,
              zIndex: 0,
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h4"
              fontWeight={900}
              sx={{
                mb: 1,
                background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.75rem", md: "2.5rem" },
              }}
            >
              Profile Settings
            </Typography>
            <Typography color="text.secondary" sx={{ mb: { xs: 4, md: 6 }, fontWeight: 500, fontSize: { xs: "0.85rem", md: "1rem" } }}>
              Update your personal information and profile picture
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: { xs: 4, md: 6 },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={preview}
                    sx={{
                      width: 150,
                      height: 150,
                      border: "6px solid #fff",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      fontSize: "3rem",
                      bgcolor: alpha("#1CB5E0", 0.1),
                      color: "#1CB5E0",
                      fontWeight: 900,
                    }}
                  >
                    {!preview && name.charAt(0)}
                  </Avatar>
                  <IconButton
                    component="label"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: "#1CB5E0",
                      color: "#fff",
                      "&:hover": { bgcolor: "#000851" },
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <PhotoCamera />
                  </IconButton>
                </Box>
                <Typography
                  variant="caption"
                  sx={{ mt: 2, fontWeight: 700, opacity: 0.6 }}
                >
                  Click icon to change picture
                </Typography>
              </Box>

              <Box sx={{ display: "grid", gap: 3, mb: 6 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Badge sx={{ color: alpha("#000851", 0.3), mr: 1.5 }} />
                    ),
                    sx: {
                      borderRadius: "16px",
                      bgcolor: alpha("#f4f6f8", 0.5),
                    },
                  }}
                />
                <TextField
                  fullWidth
                  disabled
                  label="Email Address"
                  variant="outlined"
                  value={user.email}
                  InputProps={{
                    startAdornment: (
                      <Email sx={{ color: alpha("#000851", 0.3), mr: 1.5 }} />
                    ),
                    sx: {
                      borderRadius: "16px",
                      bgcolor: alpha("#f4f6f8", 0.3),
                    },
                  }}
                  helperText="Email address cannot be changed."
                />
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Save />
                  )
                }
                sx={{
                  py: 2,
                  borderRadius: "16px",
                  fontWeight: 900,
                  fontSize: "1rem",
                  textTransform: "none",
                  background:
                    "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
                  boxShadow: "0 10px 25px rgba(28, 181, 224, 0.3)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 35px rgba(28, 181, 224, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? "Saving Changes..." : "Save Changes"}
              </Button>
            </form>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default ProfilePage;
