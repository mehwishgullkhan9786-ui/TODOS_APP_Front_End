import * as React from "react";
import { useState } from "react";
import AddRole from "../components/UersManagement/AddRole";

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TablePagination,
  TableRow,
  Chip,
  IconButton,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  FormControlLabel,
  Avatar,
  Fade,
  useTheme,
  useMediaQuery,
  styled,
  alpha,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const initialData = [
  {
    id: 1,
    role: "Super Admin",
    description: "Full system access",
    users: 3,
    status: "Active",
  },
  {
    id: 2,
    role: "Manager",
    description: "Manage teams & reports",
    users: 5,
    status: "Active",
  },
  {
    id: 3,
    role: "Editor",
    description: "Edit content",
    users: 8,
    status: "Inactive",
  },
];

export default function RolesTable() {
  const [rows, setRows] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [deleteId, setDeleteId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const mainGradient = "linear-gradient(90deg, #000851 0%, #1cb5e0 100%)";

  const GlassPaper = styled(Paper)(({ theme }) => ({
    background: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(20px) saturate(180%)",
    borderRadius: "32px",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow: "0 20px 60px rgba(0, 8, 81, 0.08)",
    padding: theme.spacing(4),
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    position: "relative",
    "&:hover": {
      boxShadow: "0 30px 80px rgba(0, 8, 81, 0.12)",
      transform: "translateY(-8px) scale(1.01)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    },
  }));

  const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderRadius: "24px",
    background: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    "& .MuiTableCell-root": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
    },
  }));

  const filteredRows = rows.filter(
    (row) =>
      (row.role || "").toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? row.status === statusFilter : true),
  );

  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    setRows(rows.filter((r) => r.id !== deleteId));
    setOpenDelete(false);
  };

  const handleEditOpen = (role) => {
    setEditRole(role);
    setOpenEdit(true);
  };

  const handleUpdate = () => {
    setRows(rows.map((r) => (r.id === editRole.id ? editRole : r)));
    setOpenEdit(false);
  };

  const [newRole, setNewRole] = useState({
    role: "",
    description: "",
    users: 0,
    status: "Active",
  });

  const handleAddRole = () => {
    setRows([...rows, { id: Date.now(), ...newRole }]);
    setOpenAdd(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mt: 4, px: { xs: 2, md: 4 } }}>
      <Fade in timeout={800}>
        <Box>
          <GlassPaper
            sx={{
              p: { xs: 3, md: 5 },
              background: mainGradient,
              color: "white",
              mb: 4,
              position: "relative",
              overflow: "hidden",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "-20%",
                right: "-10%",
                width: "300px",
                height: "300px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                gap: 4,
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 3, md: 4 },
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 50, md: 80 },
                    height: { xs: 50, md: 80 },
                    bgcolor: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    border: "3px solid rgba(255,255,255,0.4)",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                  }}
                >
                  <PeopleAltIcon sx={{ fontSize: { xs: 30, md: 45 } }} />
                </Avatar>

                <Box>
                  <Typography
                    variant="h3"
                    fontWeight={950}
                    sx={{
                      fontSize: { xs: "1.75rem", md: "3rem" },
                      fontFamily: "'Poppins', sans-serif",
                      letterSpacing: "-0.04em",
                      lineHeight: 1.1,
                      textShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    Roles Management
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      opacity: 0.9,
                      fontWeight: 500,
                      mt: 1,
                      letterSpacing: "0.02em",
                    }}
                  >
                    System Role Control
                  </Typography>
                </Box>
              </Box>

              <Button
                onClick={() => {
                  setEditRole(null);
                  setShowModal(true);
                }}
                startIcon={<AddIcon />}
                sx={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: 900,
                  fontSize: "1rem",
                  px: 3,
                  py: 1,
                  height: "60px",
                  "&:hover": {
                    background: "rgba(255,255,255,0.25)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                Add Role
              </Button>
            </Box>
          </GlassPaper>

          <Box
            sx={{
              mb: 4,
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={900}
              color="#000851"
              sx={{ opacity: 0.8 }}
            >
              Active Entities
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: { xs: "100%", md: "auto" },
              }}
            >
              <TextField
                placeholder="Search entities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  minWidth: { md: 300 },
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.7)",
                    borderRadius: "20px",
                    height: "48px",
                    "& fieldset": { border: "1px solid rgba(0,0,0,0.05)" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <SearchIcon
                      sx={{ color: "#1CB5E0", mr: 1, fontSize: 20 }}
                    />
                  ),
                }}
              />

              <TextField
                select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{
                  minWidth: 120,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.7)",
                    borderRadius: "20px",
                    height: "48px",
                    fontWeight: 700,
                    "& fieldset": { border: "1px solid rgba(0,0,0,0.05)" },
                  },
                }}
              >
                <MenuItem value="" sx={{ fontWeight: 600 }}>
                  All
                </MenuItem>
                <MenuItem value="Active" sx={{ fontWeight: 600 }}>
                  Active
                </MenuItem>
                <MenuItem value="Inactive" sx={{ fontWeight: 600 }}>
                  Inactive
                </MenuItem>
              </TextField>
            </Box>
          </Box>

          <StyledTableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {["ID", "ROLE", "USERS", "STATUS", "ACTION"].map((h) => (
                    <TableCell
                      key={h}
                      sx={{
                        background: "rgba(255, 255, 255, 0.9)",
                        fontWeight: 900,
                        fontSize: "0.75rem",
                        letterSpacing: "0.1em",
                        color: alpha("#000851", 0.6),
                        py: 3,
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      key={row.id}
                      sx={{
                        "&:hover": {
                          bgcolor: "rgba(28, 181, 224, 0.04) !important",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <TableCell
                        sx={{ fontWeight: 900, color: alpha("#000851", 0.3) }}
                      >
                        #{row.id.toString().padStart(3, "0")}
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: alpha("#000851", 0.05),
                              color: "#000851",
                              fontWeight: 800,
                              width: 40,
                              height: 40,
                              border: "1px solid rgba(0,0,0,0.05)",
                            }}
                          >
                            {row.role.charAt(0)}
                          </Avatar>

                          <Box>
                            <Typography
                              fontWeight={800}
                              color="#000851"
                              sx={{ fontSize: "1rem" }}
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
                              {row.description}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>{row.users}</TableCell>

                      <TableCell>
                        <Chip
                          label={row.status}
                          sx={{
                            fontWeight: 900,
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            bgcolor:
                              row.status === "Active"
                                ? alpha("#2ecc71", 0.08)
                                : alpha("#e74c3c", 0.08),
                            color:
                              row.status === "Active" ? "#2ecc71" : "#e74c3c",
                            border:
                              row.status === "Active"
                                ? "1px solid rgba(46, 204, 113, 0.2)"
                                : "1px solid rgba(231, 76, 60, 0.2)",
                            boxShadow:
                              row.status === "Active"
                                ? "0 4px 12px rgba(46, 204, 113, 0.1)"
                                : "0 4px 12px rgba(231, 76, 60, 0.1)",
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
                            onClick={() => handleEditOpen(row)}
                            sx={{
                              color: alpha("#1cb5e0", 0.6),
                              "&:hover": {
                                color: "#1cb5e0",
                                bgcolor: alpha("#1cb5e0", 0.08),
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteOpen(row.id)}
                            sx={{
                              color: alpha("#e74c3c", 0.6),
                              "&:hover": {
                                color: "#e74c3c",
                                bgcolor: alpha("#e74c3c", 0.08),
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, p) => setPage(p)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(+e.target.value);
                setPage(0);
              }}
              sx={{
                borderTop: "1px solid rgba(0,0,0,0.05)",
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                  {
                    fontWeight: 700,
                    opacity: 0.6,
                  },
              }}
            />
          </StyledTableContainer>
        </Box>
      </Fade>

      {showModal && (
        <AddRole
          initialData={editRole}
          onClose={() => setShowModal(false)}
          onSave={(data) => {
            if (editRole) {
              setRows(
                rows.map((r) =>
                  r.id === editRole.id
                    ? {
                        ...r,
                        role: data.roleName,
                        description: data.description,
                        status: data.status,

                        users: r.users,
                      }
                    : r,
                ),
              );
            } else {
              const existing = rows.find((r) => r.role === data.roleName);

              if (existing) {
                setRows(
                  rows.map((r) =>
                    r.role === data.roleName
                      ? { ...r, users: r.users + 1, status: data.status }
                      : r,
                  ),
                );
              } else {
                const nextId =
                  rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
                setRows([
                  ...rows,
                  {
                    id: nextId,
                    role: data.roleName,
                    description: data.description,
                    users: 1,
                    status: data.status,
                  },
                ]);
              }
            }

            setShowModal(false);
          }}
        />
      )}

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This role will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* EDIT */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            sx={{ mt: 1 }}
            label="Role"
            value={editRole?.role || ""}
            onChange={(e) => setEditRole({ ...editRole, role: e.target.value })}
          />
          <TextField
            label="Description"
            value={editRole?.description || ""}
            onChange={(e) =>
              setEditRole({ ...editRole, description: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
