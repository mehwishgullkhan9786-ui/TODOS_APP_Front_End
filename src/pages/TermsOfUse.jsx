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
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";

const TermsOfUse = () => {
  const meshGradient =
    "radial-gradient(at 0% 0%, rgba(10, 89, 192, 0.05) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(28, 181, 224, 0.05) 0, transparent 50%), #f4f6f8";

  return (
    <Box sx={{ minHeight: "100vh", background: meshGradient, py: 12 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Box
            sx={{
              display: "inline-flex",
              p: 2,
              borderRadius: "24px",
              bgcolor: alpha("#000851", 0.1),
              color: "#000851",
              mb: 3,
            }}
          >
            <GavelOutlinedIcon sx={{ fontSize: 40 }} />
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
            Terms of Use
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: alpha("#000851", 0.6), fontWeight: 600, fontSize: { xs: "0.85rem", sm: "1rem" } }}
          >
            Last Updated: March 16, 2026 • Version 2.4.0
          </Typography>
        </Box>
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
                <HistoryEduOutlinedIcon sx={{ color: "#000851" }} />
                <Typography variant="h5" fontWeight={800} color="#000851">
                  1. Acceptance of Terms
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: alpha("#000851", 0.7), lineHeight: 1.8 }}>
                By accessing or using Todo Flow, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this system.
              </Typography>
            </Box>

            <Divider sx={{ borderColor: alpha("#000851", 0.05) }} />

            <Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <CopyrightOutlinedIcon sx={{ color: "#000851" }} />
                <Typography variant="h5" fontWeight={800} color="#000851">
                  2. Intellectual Property
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: alpha("#000851", 0.7), lineHeight: 1.8 }}>
                The Todo Flow system, including its original content, features, and functionality, are and will remain the exclusive property of Todo Flow Intelligence and its licensors. Our brand identity and visual designs are protected by copyright and trademark laws.
              </Typography>
            </Box>

            <Box sx={{ p: 4, borderRadius: "24px", bgcolor: alpha("#000851", 0.05), border: "1px dashed rgba(0, 8, 81, 0.2)" }}>
              <Typography variant="h6" fontWeight={800} color="#000851" sx={{ mb: 1 }}>
                Usage Limitation
              </Typography>
              <Typography variant="body2" sx={{ color: alpha("#000851", 0.6), fontWeight: 600 }}>
                You agree not to modify, adapt, or hack the service or modify another website so as to falsely imply that it is associated with Todo Flow. Commercial redistribution is strictly prohibited.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5" fontWeight={800} color="#000851" sx={{ mb: 2 }}>
                3. User Accounts
              </Typography>
              <Typography variant="body1" sx={{ color: alpha("#000851", 0.7), lineHeight: 1.8 }}>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5" fontWeight={800} color="#000851" sx={{ mb: 2 }}>
                4. Termination
              </Typography>
              <Typography variant="body1" sx={{ color: alpha("#000851", 0.7), lineHeight: 1.8 }}>
                We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsOfUse;
