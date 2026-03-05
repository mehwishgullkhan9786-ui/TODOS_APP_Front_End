import * as React from "react";
import { useState } from "react";
import CreateUser from "./CreateUser";

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
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const initialData = [
  {
    id: 1,
    name: "Ali Khan",
    email: "ali@mail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    email: "sara@mail.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Usman Tariq",
    email: "usman@mail.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 4,
    name: "Hina Noor",
    email: "hina@mail.com",
    role: "User",
    status: "Active",
  },
];

export default function StyledUsersTable() {
  const [rows, setRows] = React.useState(initialData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");

  const [deleteId, setDeleteId] = React.useState(null);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [editUser, setEditUser] = React.useState(null);

  const mainGradient = "linear-gradient(90deg, #000851 0%, #1cb5e0 100%)";

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? row.status === statusFilter : true),
  );

  // DELETE
  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const [showModal, setShowModal] = useState(false);

  const confirmDelete = () => {
    setRows(rows.filter((r) => r.id !== deleteId));
    setOpenDelete(false);
  };

  // EDIT
  const handleEditOpen = (user) => {
    setEditUser(user);
    setOpenEdit(true);
  };

  const handleUpdate = () => {
    setRows(rows.map((r) => (r.id === editUser.id ? editUser : r)));
    setOpenEdit(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mt: 4, px: { xs: 2, md: 4 } }}>
      {/* HEADER */}
      <Box
        sx={{
          mb: 3,
          p: 3,
          borderRadius: 3,
          background: mainGradient,
          color: "white",
          boxShadow: "0 10px 20px rgba(0,8,81,0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Users Management
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            System Administration & Control
          </Typography>
        </Box>

        <Button
          onClick={() => setShowModal(true)}
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.4)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
          }}
        >
          New User
        </Button>
      </Box>

      {/* ✅ Modal must be INSIDE parent Box */}
      {showModal && (
        <CreateUser
          closeModal={() => setShowModal(false)}
          onCreate={(newUser) => {
            const nextId =
              rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
            setRows([...rows, { id: nextId, ...newUser }]);
            setShowModal(false);
          }}
        />
      )}

      {/* rest of your page */}

      {/* SEARCH */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, backgroundColor: "white" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#000851" }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          size="small"
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 150, backgroundColor: "white" }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
      </Box>

      {/* TABLE */}
      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid #e0e0e0",
        }}
      >
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["ID", "User Details", "Role", "Status", "Actions"].map(
                  (h) => (
                    <TableCell
                      key={h}
                      sx={{ background: "#f4f7fa", fontWeight: 800 }}
                    >
                      {h}
                    </TableCell>
                  ),
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id}>
                    <TableCell>#{row.id}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>{row.name}</Typography>
                      <Typography variant="caption">{row.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.role}
                        size="small"
                        sx={{ background: "#e3f2fd", color: "#1565c0" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          backgroundColor:
                            row.status === "Active" ? "#c8e6c9" : "#ffcdd2",
                          color:
                            row.status === "Active" ? "#2e7d32" : "#c62828",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEditOpen(row)}
                        sx={{ color: "#1cb5e0" }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteOpen(row.id)}
                        sx={{ color: "#d32f2f" }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

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
        />
      </Paper>

      {/* DELETE DIALOG */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This user will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={confirmDelete}
            sx={{ background: mainGradient }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 0 }}
        >
          <TextField
            label="Name"
            value={editUser?.name || ""}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            sx={{ mt: 1 }}
          />
          <TextField
            label="Email"
            value={editUser?.email || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          />
          <TextField
            label="Role"
            value={editUser?.role || ""}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
          />
          <TextField
            select
            label="Status"
            value={editUser?.status || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, status: e.target.value })
            }
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{ background: mainGradient }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
