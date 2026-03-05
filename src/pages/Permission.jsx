import React, { useState } from "react";
import SidebarComponent from "../components/SideBar";
import { useTheme } from "@mui/material/styles";

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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Save, Refresh, Delete, Security } from "@mui/icons-material";

const mainGradient = "linear-gradient(90deg, #000851 0%, #1cb5e0 100%)";

const ModernPaper = styled(Paper)({
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 4px 25px rgba(0,0,0,0.07)",
  background: "rgba(255, 255, 255, 0.95)",
});

export default function Permissions() {
  const initialPermissions = [
    {
      id: 1,
      role: "Admin",
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    {
      id: 2,
      role: "Editor",
      create: true,
      read: true,
      update: true,
      delete: false,
    },
    {
      id: 3,
      role: "Viewer",
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    {
      id: 4,
      role: "Manager",
      create: true,
      read: true,
      update: false,
      delete: false,
    },
  ];

  const [permissions, setPermissions] = useState(initialPermissions);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handlePermissionChange = (id, field) => {
    setPermissions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: !item[field] } : item,
      ),
    );
  };

  const handleSave = () => {
    console.log("Saving Permissions to DB:", permissions);
    setSnackbar({
      open: true,
      message: "Permissions updated successfully!",
      severity: "success",
    });
  };

  const handleReset = () => {
    setPermissions(initialPermissions);
    setSnackbar({
      open: true,
      message: "Changes reverted to default.",
      severity: "info",
    });
  };

  const handleDeleteRole = (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this role's permission set?",
      )
    ) {
      setPermissions((prev) => prev.filter((item) => item.id !== id));
      setSnackbar({
        open: true,
        message: "Role removed.",
        severity: "warning",
      });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 1200, p: { xs: 2, md: 4 } }}>
      <ModernPaper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Security sx={{ color: "#000851", fontSize: 35 }} />
            <Box>
              <Typography variant="h5" fontWeight="900" color="#000851">
                Access Control Matrix
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Configure what users can perform in the system
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<Refresh />}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                borderColor: "#1cb5e0",
                color: "#1cb5e0",
              }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              startIcon={<Save />}
              sx={{
                background: mainGradient,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                px: 4,
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                <TableCell sx={{ fontWeight: "900", color: "#000851", py: 2 }}>
                  ROLE
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "900", color: "#000851" }}
                >
                  CREATE
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "900", color: "#000851" }}
                >
                  READ
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "900", color: "#000851" }}
                >
                  UPDATE
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "900", color: "#000851" }}
                >
                  DELETE
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "900", color: "#000851" }}
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:hover": { bgcolor: "rgba(28, 181, 224, 0.03)" },
                    transition: "0.3s",
                  }}
                >
                  <TableCell>
                    <Chip
                      label={row.role}
                      sx={{
                        fontWeight: 800,
                        bgcolor:
                          row.role === "Admin" ? "#000851" : "rgba(0,0,0,0.06)",
                        color: row.role === "Admin" ? "#fff" : "#000851",
                        borderRadius: "8px",
                      }}
                    />
                  </TableCell>

                  {["create", "read", "update", "delete"].map((action) => (
                    <TableCell align="center" key={action}>
                      <Checkbox
                        checked={row[action]}
                        onChange={() => handlePermissionChange(row.id, action)}
                        sx={{
                          color: "#1cb5e0",
                          "&.Mui-checked": { color: "#1cb5e0" },
                          transform: "scale(1.1)",
                        }}
                      />
                    </TableCell>
                  ))}

                  <TableCell align="center">
                    <Tooltip title="Remove Role Mapping">
                      <IconButton
                        onClick={() => handleDeleteRole(row.id)}
                        sx={{ color: "#ff4d4d" }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ModernPaper>

      <Box sx={{ mt: "30px" }}>
        <Paper
          sx={{
            p: 2,
            borderRadius: "12px",
            borderLeft: "6px solid #1cb5e0",
            bgcolor: "#fff",
          }}
        >
          <Typography variant="subtitle1" fontWeight="800" color="#000851">
            Live Preview Logic
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#666", fontFamily: "monospace" }}
          >
            Active Roles: {permissions.length} | Total Permissions Enabled:{" "}
            {permissions.reduce(
              (acc, curr) =>
                acc + (curr.create + curr.read + curr.update + curr.delete),
              0,
            )}
          </Typography>
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%", fontWeight: 700, borderRadius: "10px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
