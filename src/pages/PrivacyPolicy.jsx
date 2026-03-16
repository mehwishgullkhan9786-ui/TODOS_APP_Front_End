import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  alpha,
  Divider,
} from "@mui/material";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const PrivacyPolicy = () => {
  const meshGradient =
    "radial-gradient(at 0% 0%, rgba(10, 89, 192, 0.05) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(28, 181, 224, 0.05) 0, transparent 50%), #f4f6f8";

  return (
    <Box sx={{ minHeight: "100vh", background: meshGradient, py: 12 }}>
      <Container maxWidth="md">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Box
            sx={{
              display: "inline-flex",
              p: 2,
              borderRadius: "24px",
              bgcolor: alpha("#1cb5e0", 0.1),
              color: "#1cb5e0",
              mb: 3,
            }}
          >
            <ShieldOutlinedIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography
            variant="h2"
            fontWeight={950}
            sx={{
              fontFamily: "'Outfit', sans-serif",
              color: "#000851",
              letterSpacing: "-0.04em",
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.75rem" }
            }}
          >
            Privacy Policy
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: alpha("#000851", 0.6), fontWeight: 600, fontSize: { xs: "0.85rem", sm: "1rem" } }}
          >
            Last Updated: March 16, 2026 • Version 2.4.0
          </Typography>
        </Box>

        {/* Content Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4, md: 8 },
            borderRadius: { xs: "24px", md: "40px" },
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 1)",
            boxShadow: "0 20px 60px rgba(0, 8, 81, 0.05)",
          }}
        >
          <Stack spacing={6}>
            <Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <VisibilityOutlinedIcon sx={{ color: "#1cb5e0" }} />
                <Typography variant="h5" fontWeight={800} color="#000851">
                  1. Information We Collect
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: alpha("#000851", 0.7), lineHeight: 1.8 }}>
                At Todo Flow, we collect information to provide better services to all our users. This includes account information like your name and email identity when you register, and task data you create within the intelligence stream.
              </Typography>
            </Box>

            <Divider sx={{ borderColor: alpha("#000851", 0.05) }} />

            <Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <LockOutlinedIcon sx={{ color: "#1cb5e0" }} />
                <Typography variant="h5" fontWeight={800} color="#000851">
                  2. How We Use Information
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: alpha("#000851", 0.7), lineHeight: 1.8 }}>
                We use the information we collect to provide, maintain, and improve our services. Your data helps us personalize your experience and ensures the security of your account through our encryption protocols.
              </Typography>
            </Box>

            <Box sx={{ p: 4, borderRadius: "24px", bgcolor: alpha("#1cb5e0", 0.05), border: "1px dashed rgba(28, 181, 224, 0.3)" }}>
              <Typography variant="h6" fontWeight={800} color="#000851" sx={{ mb: 1 }}>
                Security Guarantee
              </Typography>
              <Typography variant="body2" sx={{ color: alpha("#000851", 0.6), fontWeight: 600 }}>
                Your data is encrypted using military-grade AES-256 protocols. We never share your personal information with third parties without your explicit consent.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5" fontWeight={800} color="#000851" sx={{ mb: 2 }}>
                3. Your Data Rights
              </Typography>
              <Typography variant="body1" sx={{ color: alpha("#000851", 0.7), lineHeight: 1.8 }}>
                You have the right to access, update, or delete your information at any time through your dashboard settings. We provide transparency into what data is stored and how it is processed.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5" fontWeight={800} color="#000851" sx={{ mb: 2 }}>
                4. Contact Us
              </Typography>
              <Typography variant="body1" sx={{ color: alpha("#000851", 0.7), lineHeight: 1.8 }}>
                If you have any questions about this Privacy Policy, please contact our legal team at privacy@todoflow.io or through our contact page.
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
