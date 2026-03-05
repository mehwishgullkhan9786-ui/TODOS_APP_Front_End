import * as React from "react";
import { useState } from "react";
import AddRole from "../components/UersManagement/AddRole";

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
  Switch,
  FormControlLabel,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

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

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mt: 4, px: { xs: 2, md: 4 } }}>
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
            Roles Management
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            System Role Control
          </Typography>
        </Box>

        <Button
          onClick={() => {
            setEditRole(null);
            setShowModal(true);
          }}
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.4)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
          }}
        >
          Add Role
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search roles..."
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

      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["ID", "Role", "Users", "Status", "Actions"].map((h) => (
                  <TableCell
                    key={h}
                    sx={{ background: "#f4f7fa", fontWeight: 800 }}
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
                  <TableRow hover key={row.id}>
                    <TableCell>#{row.id}</TableCell>

                    <TableCell>
                      <Typography fontWeight={600}>{row.role}</Typography>
                      <Typography variant="caption">
                        {row.description}
                      </Typography>
                    </TableCell>

                    <TableCell>{row.users}</TableCell>

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
      {/* ADD ROLE DIALOG
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Role Name"
            onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
          />
          <TextField
            label="Description"
            onChange={(e) =>
              setNewRole({ ...newRole, description: e.target.value })
            }
          />
          <TextField
            select
            label="Status"
            defaultValue="Active"
            onChange={(e) => setNewRole({ ...newRole, status: e.target.value })}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddRole}>
            Add
          </Button>
        </DialogActions>
      </Dialog> */}

      {/* DELETE */}
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
