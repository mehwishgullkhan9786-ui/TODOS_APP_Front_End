import React from "react";
import { Box, Typography, Container, Link, Stack } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        background: "linear-gradient(135deg, #000851 0%, #1cb5e0 100%)",
        color: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        boxShadow: "0 -4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1} alignItems="center">
          
        
          <Typography variant="h6" fontWeight="700">
            Todo Flow
          </Typography>

         
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Organize your tasks. Boost your productivity.
          </Typography>

       
          <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
            <Link href="#" underline="hover" color="inherit">
              Privacy
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Terms
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Support
            </Link>
          </Stack>

        
          <Typography variant="caption" sx={{ opacity: 0.8, mt: 1 }}>
            © {new Date().getFullYear()} Todo Flow. All rights reserved.
          </Typography>

        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
