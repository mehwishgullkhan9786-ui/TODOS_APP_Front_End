import * as React from "react";
import { useState } from "react";
import AddRole from "../components/UersManagement/AddRole";
import { useEffect } from "react";
import axios from "axios";

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
  Grid,
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

export default function RolesTable() {
  const [rows, setRows] = useState([]);
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

  const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/roles", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRows(res.data);
      } catch (err) {
        console.log("Error fetching roles:", err);
      }
    };
    fetchRoles();
  }, []);

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
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5),
      borderRadius: "20px",
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
    overflowX: "auto",
  }));

  const filteredRows = rows.filter(
    (row) =>
      (row.role || "").toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? row.status === statusFilter : true),
  );

  const handleDeleteOpen = (_id) => {
    setDeleteId(_id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/roles/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRows(rows.filter((r) => r._id !== deleteId));
      setOpenDelete(false);
    } catch (error) {
      console.log("Error deleting roles", error);
    }
  };

  const handleEditOpen = (role) => {
    setEditRole(role);
    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/roles/${editRole._id}`, editRole, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRows(rows.map((r) => (r._id === editRole._id ? editRole : r)));
      setOpenEdit(false);
    } catch (error) {
      console.log("Error updating roles", error);
    }
  };

  const [newRole, setNewRole] = useState({
    role: "",
    description: "",
    users: 0,
    status: "Active",
  });

  const handleAddRole = () => {
    setRows([...rows, { _id: Date.now(), ...newRole }]);
    setOpenAdd(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1000,
        mt: 4,
        px: { xs: 1, sm: 2, md: 4 },
        mx: "auto",
      }}
    >
      <Fade in timeout={800}>
        <Box>
          <GlassPaper
            elevation={0}
            sx={{
              mb: 4,
            }}
          >
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12} md={7}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 2, md: 3 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 45, md: 60 },
                      height: { xs: 45, md: 60 },
                      bgcolor: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(10px)",
                      border: "2px solid rgba(255,255,255,0.5)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                  >
                    <PeopleAltIcon sx={{ fontSize: { xs: 24, md: 32 } }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{
                        fontSize: { xs: "1.2rem", md: "1.6rem" },
                        fontFamily: "'Outfit', 'Poppins', sans-serif",
                        letterSpacing: "-0.01em",
                        color: "#fff",
                      }}
                    >
                      Roles Management
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        opacity: 0.9,
                        fontWeight: 500,
                        mt: 0.5,
                        fontSize: { xs: "0.85rem", md: "0.9rem" },
                      }}
                    >
                      System Role Control
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "center",
                    justifyContent: { xs: "flex-start", md: "flex-end" },
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      ml: { xs: 2, md: 31 },
                      mr: { md: 2 },
                    }}
                  >
                    <Chip
                      label={`${rows.length} Total Roles`}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        color: "white",
                        fontWeight: 700,
                        borderRadius: "10px",
                        height: "32px",
                        fontSize: { xs: "0.7rem", sm: "0.75rem" },
                      }}
                    />
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
                      borderRadius: "14px",
                      textTransform: "none",
                      fontWeight: 700,
                      color: "#fff",
                      px: 2.5,
                      py: 1,
                      height: "44px",
                      fontSize: "0.9rem",
                      "&:hover": {
                        background: "rgba(255,255,255,0.25)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Add Role
                  </Button>
                </Box>
              </Grid>
            </Grid>
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
              sx={{ opacity: 0.9, fontSize: "1.25rem", letterSpacing: "-0.02em" }}
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
                placeholder="Search roles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  minWidth: { sm: 250, md: 320 },
                  width: { xs: "100%", sm: "auto" },
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.8)",
                    borderRadius: "20px",
                    height: "48px",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                    "& fieldset": { border: "1px solid rgba(0,0,81,0.08)" },
                    "&:hover fieldset": { borderColor: "rgba(28,181,224,0.4)" },
                    "&.Mui-focused fieldset": { borderColor: "#1CB5E0", borderWidth: "2px" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <SearchIcon
                      sx={{ color: "#1CB5E0", mr: 1.5, fontSize: 20 }}
                    />
                  ),
                }}
              />

              <TextField
                select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{
                  minWidth: 140,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.8)",
                    borderRadius: "20px",
                    height: "48px",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    "& fieldset": { border: "1px solid rgba(0,0,81,0.08)" },
                    "&:hover fieldset": { borderColor: "rgba(28,181,224,0.4)" },
                  },
                }}
              >
                <MenuItem value="" sx={{ fontWeight: 700 }}>
                  All Status
                </MenuItem>
                <MenuItem value="Active" sx={{ fontWeight: 700 }}>
                  Active
                </MenuItem>
                <MenuItem value="Inactive" sx={{ fontWeight: 700 }}>
                  Inactive
                </MenuItem>
              </TextField>
            </Box>
          </Box>

          <StyledTableContainer component={Paper} elevation={0}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {["ID", "ROLE PROFILE", "USERS", "STATUS", "OPERATIONS"].map((h) => (
                    <TableCell
                      key={h}
                      sx={{
                        background: "rgba(255, 255, 255, 0.95) !important",
                        fontWeight: 900,
                        fontSize: "0.75rem",
                        letterSpacing: "0.15em",
                        color: alpha("#000851", 0.5),
                        py: 2.5,
                        px: 2,
                        borderBottom: "2px solid rgba(0,0,81,0.05)",
                        textTransform: "uppercase",
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
                  .map((row, index) => (
                    <TableRow
                      hover
                      key={row._id}
                      sx={{
                        "&:hover": {
                          bgcolor: "rgba(28, 181, 224, 0.06) !important",
                          "& .operation-btns": { opacity: 1 },
                        },
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 900,
                          color: alpha("#000851", 0.2),
                          fontSize: "0.85rem",
                          py: 2,
                          px: 2,
                        }}
                      >
                        {String(page * rowsPerPage + index + 1).padStart(2, '0')}
                      </TableCell>

                      <TableCell sx={{ py: 2, px: 2 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2.5 }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: alpha("#000851", 0.04),
                              color: "#000851",
                              fontWeight: 800,
                              width: 42,
                              height: 42,
                              border: "2px solid #fff",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                              fontSize: "1rem",
                            }}
                          >
                            {(row.role || "R").charAt(0)}
                          </Avatar>

                          <Box>
                            <Typography
                              fontWeight={800}
                              color="#000851"
                              sx={{
                                fontSize: "0.95rem",
                                letterSpacing: "-0.01em",
                                mb: 0.2,
                              }}
                            >
                              {row.role}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 600,
                                color: alpha("#000851", 0.4),
                                fontSize: "0.75rem",
                              }}
                            >
                              {row.description}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ fontWeight: 800, color: "#000851" }}>
                        {row.users}
                      </TableCell>

                      <TableCell sx={{ py: 2, px: 2 }}>
                        <Chip
                          label={row.status || "Active"}
                          sx={{
                            fontWeight: 900,
                            fontSize: "0.65rem",
                            px: 1,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            bgcolor: row.status === "Active" ? alpha("#2ecc71", 0.1) : alpha("#e74c3c", 0.1),
                            color: row.status === "Active" ? "#2ecc71" : "#e74c3c",
                            border: `1px solid ${row.status === "Active" ? "rgba(46, 204, 113, 0.2)" : "rgba(231, 76, 60, 0.2)"}`,
                            height: "26px",
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ py: 2, px: 2 }}>
                        <Box
                          className="operation-btns"
                          sx={{
                            display: "flex",
                            gap: 1.5,
                            justifyContent: "flex-start",
                            opacity: 0.6,
                            transition: "opacity 0.2s",
                          }}
                        >
                          <IconButton
                            onClick={() => handleEditOpen(row)}
                            sx={{
                              color: "#1CB5E0",
                              "&:hover": {
                                bgcolor: alpha("#1CB5E0", 0.1),
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            <EditIcon sx={{ fontSize: 20 }} />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteOpen(row._id)}
                            sx={{
                              color: "#e74c3c",
                              "&:hover": {
                                bgcolor: alpha("#e74c3c", 0.1),
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 20 }} />
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
          onClose={() => setShowModal(false)}
          onSave={async (data) => {
            try {
              const token = localStorage.getItem("token");
              if (editRole) {
                const res = await axios.put(
                  `http://localhost:5000/roles/${editRole._id}`,
                  data,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                setRows(
                  rows.map((r) => (r._id === editRole._id ? res.data : r)),
                );
              } else {
                const res = await axios.post(
                  "http://localhost:5000/roles",
                  data,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                setRows([...rows, res.data]);
              }
              setShowModal(false);
            } catch (err) {
              console.error("Error saving role:", err);
              alert("Failed to save role. Check console for details.");
            }
          }}
        />
      )}

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        PaperProps={{
          sx: {
            borderRadius: "28px",
            p: 2,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            border: "   1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{ fontWeight: 900, color: "#000851", fontSize: "1.5rem" }}
        >
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontWeight: 600, color: alpha("#000851", 0.6) }}
          >
            This role will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setOpenDelete(false)}
            sx={{
              fontWeight: 800,
              color: alpha("#000851", 0.4),
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmDelete}
            sx={{
              background: "#e74c3c",
              borderRadius: "14px",
              fontWeight: 900,
              px: 4,
              textTransform: "none",
              "&:hover": { background: "#c0392b", transform: "scale(1.02)" },
              transition: "all 0.2s",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
