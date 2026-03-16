import React, { useState, useEffect } from "react";
import SidebarComponent from "../components/SideBar";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  alpha,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Save, Refresh, Delete, Security } from "@mui/icons-material";

const mainGradient = "linear-gradient(135deg, #0a59c0ff 0%, #000851 100%)";
const meshGradient =
  "radial-gradient(at 0% 0%, rgba(10, 89, 192, 0.8) 0, transparent 50%), radial-gradient(at 50% 0%, rgba(28, 181, 224, 0.6) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(0, 8, 81, 0.9) 0, transparent 50%), linear-gradient(135deg, #0a59c0ff 0%, #000851 100%)";
const premiumGlass =
  "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)";

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: premiumGlass,
  backdropFilter: "blur(20px) saturate(160%)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "0 8px 32px 0 rgba(0, 8, 81, 0.1)",
  padding: theme.spacing(3.5),
  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  color: "#fff",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: meshGradient,
    zIndex: -1,
    opacity: 0.95,
  },
  "&:hover": {
    boxShadow: "0 12px 48px 0 rgba(0, 8, 81, 0.2)",
    transform: "translateY(-4px)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: "24px",
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  marginTop: "24px",
  "& .MuiTableCell-root": {
    borderBottom: "1px solid rgba(0, 0, 81, 0.05)",
  },
  overflowX: "auto",
}));

export default function Permissions() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/roles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPermissions(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching permissions:", err);
      setSnackbar({
        open: true,
        message: "Failed to load permissions.",
        severity: "error",
      });
    }
  };

  const handlePermissionChange = (id, field) => {
    setPermissions((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, [field]: !item[field] } : item,
      ),
    );
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        permissions.map((role) =>
          axios.put(`http://localhost:5000/roles/${role._id}`, role, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ),
      );
      setSnackbar({
        open: true,
        message: "Permissions updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error saving permissions:", error);
      setSnackbar({
        open: true,
        message: "Error updating permissions.",
        severity: "error",
      });
    }
  };

  const handleReset = () => {
    fetchPermissions();
    setSnackbar({
      open: true,
      message: "Changes reverted to last saved state.",
      severity: "info",
    });
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 1000, p: { xs: 2, md: 4 }, mx: "auto" }}>
      <Fade in timeout={800}>
        <Box>
          <GlassPaper elevation={0}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "18px",
                    bgcolor: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid rgba(255,255,255,0.5)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                >
                  <Security sx={{ color: "#fff", fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight="900"
                    sx={{
                      fontSize: { xs: "1.2rem", md: "1.6rem" },
                      fontFamily: "'Outfit', sans-serif",
                      letterSpacing: "-0.01em",
                      color: "#fff",
                    }}
                  >
                    Access Control Matrix
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}
                  >
                    Configure system-wide role permissions
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleReset}
                  startIcon={<Refresh />}
                  sx={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "14px",
                    textTransform: "none",
                    fontWeight: 800,
                    color: "#fff",
                    px: 3,
                    height: "45px",
                    "&:hover": {
                      background: "rgba(255,255,255,0.25)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  startIcon={<Save />}
                  sx={{
                    background: "#fff",
                    borderRadius: "14px",
                    textTransform: "none",
                    fontWeight: 900,
                    color: "#000851",
                    px: 4,
                    height: "45px",
                    "&:hover": {
                      background: "rgba(255,255,255,0.9)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          </GlassPaper>

          <StyledTableContainer component={Paper} elevation={0}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {["ROLE PROFILE", "CREATE", "READ", "UPDATE", "DELETE"].map(
                    (h, i) => (
                      <TableCell
                        key={h}
                        align={i === 0 ? "left" : "center"}
                        sx={{
                          background: "rgba(255, 255, 255, 0.95) !important",
                          fontWeight: 900,
                          fontSize: "0.75rem",
                          letterSpacing: "0.15em",
                          color: alpha("#000851", 0.5),
                          py: 3,
                          px: 3,
                          borderBottom: "2px solid rgba(0,0,81,0.05)",
                          textTransform: "uppercase",
                        }}
                      >
                        {h}
                      </TableCell>
                    ),
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {permissions.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:hover": {
                        bgcolor: "rgba(28, 181, 224, 0.05) !important",
                      },
                      transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <TableCell sx={{ py: 2.5, px: 3 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "12px",
                            bgcolor: alpha("#000851", 0.04),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 800,
                            color: "#000851",
                            border: "1px solid rgba(0,0,81,0.08)",
                          }}
                        >
                          {row.role.charAt(0)}
                        </Box>
                        <Box>
                          <Typography
                            fontWeight={800}
                            color="#000851"
                            sx={{
                              fontSize: "0.95rem",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {row.role}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 600,
                              color: alpha("#000851", 0.4),
                            }}
                          >
                            {row.description || "System Role"}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {[
                      { field: "canCreate", label: "Create" },
                      { field: "canRead", label: "Read" },
                      { field: "canUpdate", label: "Update" },
                      { field: "canDelete", label: "Delete" },
                    ].map((action) => (
                      <TableCell align="center" key={action.field}>
                        <Checkbox
                          checked={row[action.field] || false}
                          onChange={() =>
                            handlePermissionChange(row._id, action.field)
                          }
                          sx={{
                            color: alpha("#1cb5e0", 0.3),
                            "&.Mui-checked": { color: "#1cb5e0" },
                            transform: "scale(1.2)",
                            transition: "all 0.2s ease",
                            "&:hover": { bgcolor: alpha("#1cb5e0", 0.05) },
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>

          <Box sx={{ mt: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "20px",
                borderLeft: "6px solid #1cb5e0",
                bgcolor: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(0,0,81,0.05)",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Security sx={{ color: "#1cb5e0" }} />
              <Typography
                variant="subtitle2"
                fontWeight="800"
                color="#000851"
                sx={{ opacity: 0.8 }}
              >
                Role Summary: {permissions.length} Active Profiles |{" "}
                {permissions.reduce(
                  (acc, curr) =>
                    acc +
                    (curr.canCreate +
                      curr.canRead +
                      curr.canUpdate +
                      curr.canDelete),
                  0,
                )}{" "}
                Permissions Assigned
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Fade>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          sx={{
            width: "100%",
            fontWeight: 800,
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.05)",
            "& .MuiAlert-icon": { fontSize: 24 },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
