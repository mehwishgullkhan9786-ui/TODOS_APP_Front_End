import * as React from "react";
import { useState } from "react";
import CreateUser from "./CreateUser";
import axios from "axios";
import { useEffect } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  IconButton,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  DialogTitle,
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
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export default function StyledUsersTable() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  
  const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRows(res.data);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  const mainGradient = "linear-gradient(135deg, #0a59c0ff 0%,  #000851 100%)";
  const meshGradient =
    "radial-gradient(at 0% 0%, rgba(10, 89, 192, 0.8) 0, transparent 50%), radial-gradient(at 50% 0%, rgba(28, 181, 224, 0.6) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(0, 8, 81, 0.9) 0, transparent 50%), linear-gradient(135deg, #0a59c0ff 0%, #000851 100%)";
  const premiumGlass =
    "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    [theme.breakpoints.down("sm")]: {
      borderRadius: "16px",
    },
  }));

  const filteredRows = rows.filter(
    (row) =>
      (row.name || "").toLowerCase().includes(search.toLowerCase()) &&
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
      await axios.delete(`http://localhost:5000/users/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRows(rows.filter((r) => r._id !== deleteId));
      setOpenDelete(false);
    } catch (error) {
      console.log("Error deleting user", error);
    }
  };

  const handleEditOpen = (user) => {
    setEditUser(user);
    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/users/${editUser._id}`,
        editUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRows(rows.map((r) => (r._id === editUser._id ? res.data : r)));
      setOpenEdit(false);
    } catch (error) {
      console.log("Error updating user", error);
    }
  };

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
                      Users Management
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
                      System Access Control
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
                      label={`${rows.length} Total Users`}
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
                    onClick={() => setShowModal(true)}
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
                    Add User
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </GlassPaper>

          {showModal && (
            <CreateUser
              closeModal={() => setShowModal(false)}
              onCreate={async (newUser) => {
                try {
                  const token = localStorage.getItem("token");
                  const res = await axios.post(
                    "http://localhost:5000/users",
                    newUser,
                    { headers: { Authorization: `Bearer ${token}` } }
                  );

                  setRows([...rows, res.data]);

                  setShowModal(false);
                } catch (error) {
                  console.log("Error creating user", error);
                }
              }}
            />
          )}

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
              sx={{
                opacity: 0.9,
                fontSize: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              Active Entities
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <TextField
                placeholder="Search users..."
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
                    "&.Mui-focused fieldset": {
                      borderColor: "#1CB5E0",
                      borderWidth: "2px",
                    },
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
            <Table stickyHeader size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  {[
                    "ID",
                    "USER PROFILE",
                    "ROLE",
                    "STATUS",
                    "OPERATIONS",
                  ].map((h) => (
                    <TableCell
                      key={h}
                      sx={{
                        background: "rgba(255, 255, 255, 0.95) !important",
                        fontWeight: 900,
                        fontSize: {
                          xs: "0.65rem",
                          sm: "0.75rem",
                          lg: "0.75rem",
                        },
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
                        {String(page * rowsPerPage + index + 1).padStart(
                          2,
                          "0",
                        )}
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2.5,
                          }}
                        >
                            <Avatar
                              src={row.profileImage ? `http://localhost:5000${row.profileImage}` : ""}
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
                              {(row.name || "U").charAt(0)}
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
                              {row.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 600,
                                color: alpha("#000851", 0.4),
                                fontSize: "0.75rem",
                              }}
                            >
                              {row.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 2 }}>
                        <Chip
                          label={row.role || "Viewer"}
                          sx={{
                            fontWeight: 800,
                            fontSize: "0.7rem",
                            px: 1,
                            bgcolor: "rgba(28, 181, 224, 0.08)",
                            color: "#1CB5E0",
                            borderRadius: "10px",
                            border: "1px solid rgba(28, 181, 224, 0.15)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            height: "26px",
                          }}
                        />
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
                            bgcolor:
                              row.status === "Active"
                                ? alpha("#2ecc71", 0.1)
                                : alpha("#e74c3c", 0.1),
                            color:
                              row.status === "Active" ? "#2ecc71" : "#e74c3c",
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
                            gap: 1,
                            justifyContent: "center",
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
              rowsPerPageOptions={isMobile ? [5] : [5, 10]}
              component="div"
              count={filteredRows.length}
              rowsPerPage={isMobile ? 5 : rowsPerPage}
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
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.875rem",
                      lg: "0.9rem",
                      xl: "1rem",
                    },
                  },
                "& .MuiTablePagination-root": {
                  overflow: "auto",
                },
              }}
            />
          </StyledTableContainer>
        </Box>
      </Fade>

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        PaperProps={{
          sx: {
            borderRadius: "28px",
            p: 2,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            width: { xs: "90%", sm: "auto" },
            m: { xs: 2, sm: "auto" },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 900,
            color: "#000851",
            fontSize: {
              xs: "1.25rem",
              sm: "1.5rem",
              lg: "1.4rem",
              xl: "1.5rem",
            },
          }}
        >
          Delete User
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontWeight: 600,
              color: alpha("#000851", 0.6),
              fontSize: {
                xs: "0.875rem",
                sm: "1rem",
                lg: "0.95rem",
                xl: "1rem",
              },
            }}
          >
            This user will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 3, lg: 2.5 }, gap: 2 }}>
          <Button
            onClick={() => setOpenDelete(false)}
            sx={{
              fontWeight: 800,
              color: alpha("#000851", 0.4),
              textTransform: "none",
              fontSize: {
                xs: "0.75rem",
                sm: "1rem",
                lg: "0.95rem",
                xl: "1rem",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
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

      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        PaperProps={{
          sx: {
            borderRadius: "32px",
            p: { xs: 1.5, sm: 2, lg: 2 },
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            maxWidth: { xs: "95%", sm: "500px", lg: "480px" },
            width: "100%",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            m: { xs: 1, sm: "auto" },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 950,
            color: "#000851",
            fontSize: {
              xs: "1.4rem",
              sm: "1.8rem",
              lg: "1.65rem",
              xl: "1.8rem",
            },
            fontFamily: "'Poppins', sans-serif",
            pb: 1,
          }}
        >
          Modify Entity
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 3, lg: 2.5 },
            mt: 2,
          }}
        >
          <TextField
            fullWidth
            label="Entity Name"
            value={editUser?.name || ""}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                fontWeight: 700,
              },
              fontSize: { xs: "0.875rem", lg: "0.95rem", xl: "1rem" },
            }}
          />
          <TextField
            fullWidth
            label="Communication Endpoint"
            value={editUser?.email || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                fontWeight: 700,
              },
              fontSize: { xs: "0.875rem", lg: "0.95rem", xl: "1rem" },
            }}
          />
          <TextField
            fullWidth
            label="System Role"
            value={editUser?.role || ""}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                fontWeight: 700,
              },
              fontSize: { xs: "0.875rem", lg: "0.95rem", xl: "1rem" },
            }}
          />
          <TextField
            select
            fullWidth
            label="Operational Status"
            value={editUser?.status || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, status: e.target.value })
            }
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                fontWeight: 700,
              },
              fontSize: { xs: "0.875rem", lg: "0.95rem", xl: "1rem" },
            }}
          >
            <MenuItem value="Active" sx={{ fontWeight: 700 }}>
              Active
            </MenuItem>
            <MenuItem value="Inactive" sx={{ fontWeight: 700 }}>
              Inactive
            </MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions
          sx={{
            p: { xs: 2, sm: 4, lg: 3 },
            pt: { xs: 1, sm: 2, lg: 1.5 },
            gap: 2,
          }}
        >
          <Button
            onClick={() => setOpenEdit(false)}
            sx={{
              fontWeight: 800,
              color: alpha("#000851", 0.4),
              textTransform: "none",
              fontSize: {
                xs: "0.75rem",
                sm: "1rem",
                lg: "0.95rem",
                xl: "1rem",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              background: mainGradient,
              borderRadius: "18px",
              fontWeight: 900,
              px: { xs: 3, sm: 6, lg: 5 },
              py: 1.5,
              textTransform: "none",
              fontSize: {
                xs: "0.75rem",
                sm: "1rem",
                lg: "0.95rem",
                xl: "1rem",
              },
              boxShadow: "0 10px 25px rgba(28, 181, 224, 0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 15px 30px rgba(28, 181, 224, 0.4)",
              },
              transition: "all 0.3s",
            }}
          >
            Update Profile
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
