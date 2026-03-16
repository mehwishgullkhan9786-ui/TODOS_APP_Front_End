import React from "react";
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Avatar,
  Fade,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent successfully.");
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      value: "support@todoflow.com",
    },
    {
      icon: <PhoneIcon />,
      value: "+923152209752",
    },
    {
      icon: <LocationOnIcon />,
      value: "Lahore, Pakistan",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f7ff 0%, #e0efff 100%)",
        py: { xs: 4, sm: 6, md: 10 },
        px: { xs: 1.5, sm: 4, md: 2 },
      }}
    >
      <Fade in timeout={1000}>
        <Paper
          elevation={15}
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "600px", md: "900px" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: { xs: "24px", md: "32px" },
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 8, 81, 0.15)",
          }}
        >
          <Box
            sx={{
              flex: 1.2,
              p: { xs: 3, sm: 5, md: 7 },
              background: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 1,
                fontSize: { xs: "1.75rem", sm: "2.125rem" },
                background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Get In Touch
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mb: { xs: 3, md: 5 },
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Send us a message and we'll get back to you shortly.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: { xs: 2.5, md: 3 } }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mb: 1, ml: 0.5, color: "#000851" }}
                >
                  Full Name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter your name"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      bgcolor: "#f8faff",
                      p: { xs: "12px 16px", md: "14px 20px" },
                      borderRadius: "16px",
                      border: "1px solid rgba(0, 8, 81, 0.05)",
                      transition: "all 0.3s ease",
                      "&:focus-within": {
                        bgcolor: "#fff",
                        boxShadow: "0 8px 24px rgba(28, 181, 224, 0.12)",
                        borderColor: "#1CB5E0",
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: { xs: 2.5, md: 3 } }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mb: 1, ml: 0.5, color: "#000851" }}
                >
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  type="email"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      bgcolor: "#f8faff",
                      p: { xs: "12px 16px", md: "14px 20px" },
                      borderRadius: "16px",
                      border: "1px solid rgba(0, 8, 81, 0.05)",
                      transition: "all 0.3s ease",
                      "&:focus-within": {
                        bgcolor: "#fff",
                        boxShadow: "0 8px 24px rgba(28, 181, 224, 0.12)",
                        borderColor: "#1CB5E0",
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mb: 1, ml: 0.5, color: "#000851" }}
                >
                  Message
                </Typography>
                <TextField
                  fullWidth
                  placeholder="How can we help you?"
                  multiline
                  rows={4}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      bgcolor: "#f8faff",
                      p: { xs: "14px 16px", md: "18px 20px" },
                      borderRadius: "16px",
                      border: "1px solid rgba(0, 8, 81, 0.05)",
                      transition: "all 0.3s ease",
                      "&:focus-within": {
                        bgcolor: "#fff",
                        boxShadow: "0 8px 24px rgba(28, 181, 224, 0.12)",
                        borderColor: "#1CB5E0",
                      },
                    },
                  }}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: { xs: 1.8, md: 2.2 },
                  borderRadius: "20px",
                  fontWeight: 800,
                  textTransform: "none",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  background:
                    "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
                  boxShadow: "0 10px 30px rgba(0, 8, 81, 0.2)",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #1CB5E0 20%, #000851 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 40px rgba(0, 8, 81, 0.3)",
                  },
                  transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              >
                Send Message
              </Button>
            </form>
          </Box>

          <Box
            sx={{
              flex: 0.8,
              p: { xs: 3, sm: 4, md: 7 },
              background: "linear-gradient(135deg, #1CB5E0 0%, #000851 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 1,
                color: "white",
                fontSize: { xs: "1.75rem", sm: "2.125rem" },
              }}
            >
              Info
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: { xs: 4, md: 6 },
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Our team is here to support your journey towards better
              productivity.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 3, md: 4 },
              }}
            >
              {contactInfo.map((info, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 2, md: 3 },
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateX(10px)",
                      "& .icon-avatar": {
                        bgcolor: "white",
                        color: "#000851",
                        transform: "scale(1.1)",
                      },
                    },
                  }}
                >
                  <Avatar
                    className="icon-avatar"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.15)",
                      color: "white",
                      width: { xs: 48, md: 56 },
                      height: { xs: 48, md: 56 },
                      borderRadius: "16px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {info.icon}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                        wordBreak: "break-all",
                      }}
                    >
                      {info.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box sx={{ mt: { xs: 5, md: 8 } }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  mb: { xs: 2, md: 3 },
                  letterSpacing: "1px",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                FOLLOW US
              </Typography>
              <Box sx={{ display: "flex", gap: { xs: 1.5, md: 2.5 } }}>
                {[
                  <InstagramIcon />,
                  <TwitterIcon />,
                  <FacebookIcon />,
                  <LinkedInIcon />,
                ].map((icon, i) => (
                  <Avatar
                    key={i}
                    sx={{
                      width: { xs: 40, md: 48 },
                      height: { xs: 40, md: 48 },
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      border: "1px solid rgba(255,255,255,0.1)",
                      "&:hover": {
                        bgcolor: "white",
                        color: "#000851",
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    {React.cloneElement(icon, {
                      sx: { fontSize: { xs: 20, md: 24 } },
                    })}
                  </Avatar>
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}
