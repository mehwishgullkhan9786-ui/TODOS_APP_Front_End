import React, { useState } from "react";
import SidebarComponent from "../components/SideBar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  Box,
  Grid,
  Card,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const mainGradient = "linear-gradient(135deg, #000851 0%, #1cb5e0 100%)";

const StatCard = styled(Card)(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  color: "#fff",
  borderRadius: "16px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 16px 24px rgba(0,0,0,0.12)",
  },
}));

const SectionHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  borderBottom: "1px solid #e0e0e0",
  paddingBottom: "8px",
});

const TaskItem = styled(ListItem)({
  borderRadius: "12px",
  transition: "all 0.2s",
  "&:hover": { backgroundColor: "#f9faff" },
  paddingTop: "12px",
  paddingBottom: "12px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

const CalendarDay = styled(Box)(({ isToday, isSelected }) => ({
  padding: "12px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "0.85rem",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s",
  backgroundColor: isSelected ? "#2ecc71" : isToday ? "#3498db" : "transparent",
  color: isSelected || isToday ? "#fff" : "#2c3e50",
  "&:hover": { backgroundColor: isSelected ? "#2ecc71" : "#e6f0ff" },
}));

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session Expire! Kindly Login First...");
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  const location = useLocation();
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finish project report", completed: true },
    { id: 2, text: "Meeting with client", completed: true },
    { id: 3, text: "Update website content", completed: true },
    { id: 4, text: "Gym Session", completed: false },
    { id: 5, text: "Plan weekend trip", completed: false },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskInput, setTaskInput] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const recurringTasks = ["Daily Standup", "Weekly Report", "Monthly Backup"];
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const isDashboardHome =
    location.pathname.toLowerCase() === "/dashboard" ||
    location.pathname === "/";

  const handlePrevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  const handleNextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) days.push(d);
    return days;
  };

  const calendarDays = generateCalendar();
  const monthYear = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const today = new Date();

  const handleDateClick = (day) => {
    if (!day) return;
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
    );
  };

  const handleToggleTask = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  const handleDeleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const handleOpenAdd = () => {
    setEditingTask(null);
    setTaskInput("");
    setOpenDialog(true);
  };
  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setTaskInput(task.text);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);
  const handleSaveTask = () => {
    if (!taskInput.trim()) return;
    if (editingTask)
      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id ? { ...t, text: taskInput } : t,
        ),
      );
    else
      setTasks([
        ...tasks,
        { id: Date.now(), text: taskInput, completed: false },
      ]);
    handleCloseDialog();
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const dynamicStats = [
    { label: "Total Tasks", value: total, color: "#3498db" },
    { label: "Completed", value: completed, color: "#2ecc71" },
    { label: "Pending", value: pending, color: "#f39c12" },
    { label: "Overdue", value: 2, color: "#e74c3c" },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f6f8", minHeight: "100vh", p: 3 }}>
      <SidebarComponent
        open={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <Box
        sx={{
          flexGrow: 1,
          pl: { md: drawerOpen ? "240px" : "80px" },
          transition: "0.3s",
          pl: { md: "240px" },
        }}
      >
        {isDashboardHome ? (
          <>
            {/* Stats */}
            <Grid container spacing={3} sx={{ mb: 5 }}>
              {dynamicStats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <StatCard bgcolor={stat.color}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <CheckCircle sx={{ fontSize: 30, opacity: 0.85 }} />
                      <Typography variant="h3" fontWeight="800">
                        {stat.value}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight="700"
                      sx={{ opacity: 0.9 }}
                    >
                      {stat.label.toUpperCase()}
                    </Typography>
                  </StatCard>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 16,
                    mb: 4,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                  }}
                >
                  <SectionHeader>
                    <Typography variant="h6" fontWeight="800" color="#000851">
                      Task List
                    </Typography>
                    <Button
                      onClick={handleOpenAdd}
                      variant="contained"
                      sx={{
                        background: mainGradient,
                        textTransform: "none",
                        borderRadius: "10px",
                        px: 3,
                      }}
                    >
                      + Add Task
                    </Button>
                  </SectionHeader>
                  <List>
                    {tasks.map((task) => (
                      <TaskItem key={task.id}>
                        <ListItemIcon>
                          <Checkbox
                            checked={task.completed}
                            onChange={() => handleToggleTask(task.id)}
                            icon={<RadioButtonUnchecked />}
                            checkedIcon={
                              <CheckCircle sx={{ color: "#2ecc71" }} />
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={task.text}
                          primaryTypographyProps={{
                            style: {
                              textDecoration: task.completed
                                ? "line-through"
                                : "none",
                              color: task.completed ? "#95a5a6" : "#2c3e50",
                              fontWeight: 600,
                            },
                          }}
                        />
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            size="small"
                            onClick={() => handleOpenEdit(task)}
                            sx={{ color: "#1cb5e0", fontWeight: 600 }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            onClick={() => handleDeleteTask(task.id)}
                            sx={{ color: "#e74c3c", fontWeight: 600 }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TaskItem>
                    ))}
                  </List>
                </Paper>

                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 16,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                  }}
                >
                  <SectionHeader>
                    <Typography variant="h6" fontWeight="800" color="#000851">
                      Quick Links
                    </Typography>
                  </SectionHeader>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleOpenAdd}
                      sx={{ background: mainGradient, textTransform: "none" }}
                    >
                      Add New Task
                    </Button>
                    <Link to="/dashboard/users-table">
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "#2ecc71", textTransform: "none" }}
                      >
                        Manage Users
                      </Button>
                    </Link>
                    <Link to="/dashboard/roles">
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#e74c3c",
                          textTransform: "none",
                          flex: 1,
                        }}
                      >
                        Manage Roles
                      </Button>
                    </Link>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 16,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <IconButton size="small" onClick={handlePrevMonth}>
                      <ChevronLeft />
                    </IconButton>
                    <Typography fontWeight="800" color="#000851">
                      {monthYear}
                    </Typography>
                    <IconButton size="small" onClick={handleNextMonth}>
                      <ChevronRight />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: 1,
                      textAlign: "center",
                    }}
                  >
                    {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                      <Typography
                        key={d}
                        variant="caption"
                        fontWeight="900"
                        color="#94a3b8"
                      >
                        {d}
                      </Typography>
                    ))}
                    {calendarDays.map((day, index) => (
                      <CalendarDay
                        key={index}
                        isToday={
                          day === today.getDate() &&
                          currentDate.getMonth() === today.getMonth()
                        }
                        isSelected={
                          selectedDate &&
                          day === selectedDate.getDate() &&
                          currentDate.getMonth() === selectedDate.getMonth()
                        }
                        onClick={() => handleDateClick(day)}
                      >
                        {day || ""}
                      </CalendarDay>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <Outlet />
        )}
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{ sx: { borderRadius: 16 } }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          {editingTask ? "Update Task" : "New Task"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            variant="standard"
            sx={{ mt: 1 }}
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSaveTask()}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveTask}
            sx={{ background: mainGradient }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
