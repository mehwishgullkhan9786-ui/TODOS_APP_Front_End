import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Link,
  Stack,
  IconButton,
  Divider,
  Grid,
  styled,
  alpha,
  TextField,
  InputAdornment,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SendIcon from "@mui/icons-material/Send";

const simpleGradient = "linear-gradient(135deg, #000851 0%, #1cb5e0 100%)";

const GlassFooter = styled(Box)(({ theme }) => ({
  background: simpleGradient,
  color: "#fff",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(6),
  marginTop: "auto",
  boxShadow: "0 -8px 32px rgba(0, 0, 81, 0.15)",
  position: "relative",
  overflow: "hidden",
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: "#fff",
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  width: "42px",
  height: "42px",
  "&:hover": {
    background: "#fff",
    color: "#000851",
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: alpha("#fff", 0.75),
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.95rem",
  transition: "all 0.25s ease",
  display: "inline-flex",
  alignItems: "center",
  width: "fit-content",
  "&:hover": {
    color: "#fff",
    transform: "translateX(6px)",
    textShadow: "0 0 12px rgba(255,255,255,0.3)",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: "1rem",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  marginBottom: theme.spacing(4),
  color: alpha("#fff", 0.5),
  position: "relative",
  textAlign: "center", // Center text
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: "50%", // Center underline
    transform: "translateX(-50%)", // Center underline
    width: "30px",
    height: "2px",
    background: "#1cb5e0",
    borderRadius: "2px",
  },
}));

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed ${email} successfully!`);
      setEmail("");
    }
  };

  return (
    <GlassFooter component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={8} justifyContent="center" alignItems="flex-start">
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={4} alignItems="center" textAlign="center">
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={950}
                  sx={{
                    fontFamily: "'Outfit', 'Poppins', sans-serif",
                    letterSpacing: "-0.03em",
                    mb: 2,
                    background: "linear-gradient(to right, #fff, #1cb5e0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Todo Flow
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: alpha("#fff", 0.85),
                    lineHeight: 1.8,
                    fontWeight: 500,
                    maxWidth: "340px",
                    fontSize: "1rem",
                    margin: "0 auto", // Center the text block
                  }}
                >
                  Experience the pinnacle of task management with our intelligent flow system. Built for speed, designed for clarity.
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <SectionTitle variant="subtitle2">Explore</SectionTitle>
            <Stack spacing={2.5} alignItems="center">
              <FooterLink component={RouterLink} to="/">Home</FooterLink>
              <FooterLink component={RouterLink} to="/dashboard">Dashboard</FooterLink>
              <FooterLink component={RouterLink} to="/about">About Us</FooterLink>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <SectionTitle variant="subtitle2">Support</SectionTitle>
            <Stack spacing={2.5} alignItems="center">
              <FooterLink component={RouterLink} to="/privacy">Privacy Policy</FooterLink>
              <FooterLink component={RouterLink} to="/terms">Terms of Use</FooterLink>
              <FooterLink component={RouterLink} to="/contact">Contact Support</FooterLink>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SectionTitle variant="subtitle2">Stay Connected</SectionTitle>
            <Stack spacing={3} alignItems="center" textAlign="center">
              <Typography variant="body2" sx={{ color: alpha("#fff", 0.7), fontWeight: 600 }}>
                Get the latest updates delivered directly to your inbox.
              </Typography>
              <Box component="form" onSubmit={handleSubscribe} sx={{ width: "100%", maxWidth: "300px" }}>
                <TextField
                  fullWidth
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{
                    mb: 2, // Added margin bottom
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "rgba(255,255,255,0.06)",
                      borderRadius: "16px",
                      color: "#fff",
                      transition: "all 0.3s ease",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                      "&:hover fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                      "&.Mui-focused fieldset": { borderColor: "#1cb5e0", borderWidth: "2px" },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: 0.5 }}>
                        <IconButton 
                          type="submit" 
                          size="small" 
                          sx={{ 
                            color: "#fff",
                            bgcolor: "rgba(28, 181, 224, 0.4)",
                            "&:hover": { bgcolor: "#1cb5e0" }
                          }}
                        >
                          <SendIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Stack direction="row" spacing={2} justifyContent="center">
                <SocialButton size="small"><GitHubIcon fontSize="small"  /></SocialButton>
                <SocialButton size="small"><LinkedInIcon fontSize="small" /></SocialButton>
                <SocialButton size="small"><TwitterIcon fontSize="small" /></SocialButton>
                <SocialButton size="small"><WhatsAppIcon fontSize="small" /></SocialButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 10, mb: 6, borderColor: "rgba(255,255,255,0.08)" }} />

        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          flexWrap: "wrap", 
          gap: 4
        }}>
          <Typography variant="caption" sx={{ color: alpha("#fff", 0.45), fontWeight: 700, letterSpacing: "0.02em" }}>
            © {new Date().getFullYear()} TODO FLOW SYSTEM. ALL RIGHTS RESERVED.
          </Typography>
          <Stack direction="row" spacing={5}>
            <Typography variant="caption" sx={{ color: alpha("#fff", 0.3), fontWeight: 700, letterSpacing: "0.1em" }}>
              VERSION 2.4.0
            </Typography>
            <Typography variant="caption" sx={{ color: "#1cb5e0", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              System Excellence
            </Typography>
          </Stack>
        </Box>
      </Container>
    </GlassFooter>
  );
}

export default Footer;
