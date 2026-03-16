import React, { useState, useEffect } from "react";
import SidebarComponent from "../components/SideBar";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
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
  Fade,
  alpha,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  PendingActions,
  History,
  PriorityHigh,
  Add as AddIcon,
  Group as GroupIcon,
  Security as SecurityIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(12px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 8, 81, 0.05)",
  padding: theme.spacing(2, 2),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3),
  },
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0 12px 48px rgba(0, 8, 81, 0.1)",
  },
}));

const StatCard = styled(Card)(({ gradient }) => ({
  background: gradient,
  color: "#fff",
  borderRadius: "24px",
  padding: "24px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-10%",
    right: "-10%",
    width: "120px",
    height: "120px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
  },
}));

const CalendarDay = styled(Box)(({ isToday, isSelected }) => ({
  width: "36px",
  height: "36px",
  margin: "auto",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "0.85rem",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  backgroundColor: isSelected
    ? "#1CB5E0"
    : isToday
      ? alpha("#1CB5E0", 0.1)
      : "transparent",
  color: isSelected ? "#fff" : isToday ? "#1CB5E0" : "#2c3e50",
  border: isToday && !isSelected ? "1px solid #1CB5E0" : "none",
  "&:hover": {
    backgroundColor: isSelected ? "#1CB5E0" : alpha("#1CB5E0", 0.05),
    transform: "scale(1.1)",
  },
}));

export default function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      try {
        const res = await axios.get("http://localhost:5000/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.map((t) => ({ ...t, id: t._id })));
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskInput, setTaskInput] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const isDashboardHome = location.pathname.toLowerCase() === "/dashboard";

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
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

  const handleToggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:5000/tasks/${id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === id ? { ...res.data, id: res.data._id } : t,
        ),
      );
    } catch (err) {
      console.error(err);
      alert(
        "Error updating task: " + (err.response?.data?.message || err.message),
      );
    }
  };

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert(
        "Error deleting task: " + (err.response?.data?.message || err.message),
      );
    }
  };

  const handleOpenAdd = () => {
    setEditingTask(null);
    setTaskInput("");
    setOpenDialog(true);
  };

  const handleSaveTask = async () => {
    if (!taskInput.trim()) return;

    const token = localStorage.getItem("token");
    try {
      if (editingTask) {
        const res = await axios.put(
          `http://localhost:5000/tasks/${editingTask.id}`,
          { text: taskInput },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === editingTask.id ? { ...res.data, id: res.data._id } : t,
          ),
        );
      } else {
        const res = await axios.post(
          "http://localhost:5000/tasks",
          { text: taskInput },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        console.log("Task added successfully:", res.data);
        setTasks((prevTasks) => [
          ...prevTasks,
          { ...res.data, id: res.data._id },
        ]);
      }
      setTaskInput("");
      setOpenDialog(false);
    } catch (err) {
      console.error(err);
      alert(
        "Error saving task: " + (err.response?.data?.message || err.message),
      );
    }
  };

  const stats = [
    {
      label: "Total Tasks",
      value: tasks.length,
      icon: <TrendingUp />,
      gradient: "linear-gradient(135deg, #1CB5E0 0%, #000851 100%)",
    },
    {
      label: "Completed",
      value: tasks.filter((t) => t.completed).length,
      icon: <CheckCircle />,
      gradient: "linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)",
    },
    {
      label: "Pending",
      value: tasks.filter((t) => !t.completed).length,
      icon: <PendingActions />,
      gradient: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    },
    {
      label: "Archived",
      value: 12,
      icon: <History />,
      gradient: "linear-gradient(135deg, #373B44 0%, #4286f4 100%)",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#f8faff",
        minHeight: "100vh",
        overflowX: "auto",
      }}
    >
      <SidebarComponent
        open={drawerOpen}
        handleDrawerOpen={toggleDrawer}
        handleDrawerClose={toggleDrawer}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          background: "transparent",
          pt: "80px", // Account for fixed navbar height
          // Use constant margins/widths per breakpoint so content doesn't shift
          marginLeft: { xs: "64px", sm: "64px", md: "200px" },
          width: {
            xs: "calc(100% - 64px)",
            sm: "calc(100% - 64px)",
            md: "calc(100% - 200px)",
          },
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          padding: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "1200px" }}>
          {isDashboardHome ? (
            <Fade in timeout={800}>
              <Box>
                <Box
                  sx={{
                    mb: { xs: 3, md: 6 },
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{
                      color: "#000851",
                      mb: 1,
                      fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    }}
                  >
                    Welcome Back! 👋
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      maxWidth: "600px",
                      textAlign: "center",
                      px: { xs: 2, md: 0 },
                    }}
                  >
                    Elevate your productivity today! Here is an at-a-glance look
                    at your progress and upcoming tasks.
                  </Typography>
                </Box>

                <Grid
                  container
                  spacing={{ xs: 1, sm: 2 }}
                  sx={{ mb: { xs: 3, md: 6 } }}
                >
                  {stats.map((stat, index) => (
                    <Grid item xs={6} sm={6} md={3} key={index}>
                      <StatCard gradient={stat.gradient}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 2,
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "rgba(255,255,255,0.2)",
                              color: "white",
                              width: { xs: 32, sm: 40 },
                              height: { xs: 32, sm: 40 },
                            }}
                          >
                            {stat.icon}
                          </Avatar>
                          <Box sx={{ textAlign: "right" }}>
                            <Typography
                              fontWeight={800}
                              sx={{
                                fontSize: {
                                  xs: "1.25rem",
                                  sm: "1.5rem",
                                  md: "2.25rem",
                                },
                              }}
                            >
                              {stat.value}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                opacity: 0.8,
                                fontWeight: 700,
                                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                              }}
                            >
                              {stat.label.toUpperCase()}
                            </Typography>
                          </Box>
                        </Box>
                      </StatCard>
                    </Grid>
                  ))}
                </Grid>

                <Grid container spacing={{ xs: 2, md: 4 }}>
                  <Grid item xs={12} md={8}>
                    <GlassPaper>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          justifyContent: "space-between",
                          alignItems: { xs: "flex-start", sm: "center" },
                          mb: 4,
                          gap: { xs: 2, sm: 0 },
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={800}
                          color="#000851"
                          sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                        >
                          Recent Tasks
                        </Typography>
                        <Button
                          onClick={handleOpenAdd}
                          variant="contained"
                          startIcon={<AddIcon />}
                          sx={{
                            background: "#0f4dbeff",
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 700,
                            px: { xs: 2, sm: 3 },
                            fontSize: { xs: "0.8rem", sm: "0.9rem" },
                            boxShadow: "0 8px 16px rgba(28, 181, 224, 0.2)",
                          }}
                        >
                          New Task
                        </Button>
                      </Box>
                      <List disablePadding>
                        {tasks.map((task) => (
                          <ListItem
                            key={task.id}
                            sx={{
                              mb: 1.5,
                              borderRadius: "16px",
                              bgcolor: alpha("#000851", 0.02),
                              transition: "0.2s",
                              "&:hover": { bgcolor: alpha("#000851", 0.05) },
                              px: { xs: 1, sm: 2 },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}>
                              <Checkbox
                                checked={task.completed}
                                onChange={() => handleToggleTask(task.id)}
                                icon={<RadioButtonUnchecked />}
                                checkedIcon={
                                  <CheckCircle sx={{ color: "#1CB5E0" }} />
                                }
                                size={isPhone ? "small" : "medium"}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={task.text}
                              primaryTypographyProps={{
                                fontWeight: 600,
                                fontSize: { xs: "0.9rem", sm: "1rem" },
                                style: {
                                  textDecoration: task.completed
                                    ? "line-through"
                                    : "none",
                                  color: task.completed
                                    ? "text.disabled"
                                    : "#2c3e50",
                                },
                              }}
                            />
                            <IconButton
                              onClick={() => handleDeleteTask(task.id)}
                              size={isPhone ? "small" : "medium"}
                              sx={{ color: "#e74c3c" }}
                            >
                              <PriorityHigh
                                fontSize={isPhone ? "small" : "medium"}
                              />
                            </IconButton>
                          </ListItem>
                        ))}
                      </List>
                    </GlassPaper>

                    <Box sx={{ mt: 4 }}>
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        color="#000851"
                        mb={3}
                        sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                      >
                        Quick Navigation
                      </Typography>
                      <Grid container spacing={2}>
                        {[
                          {
                            label: "New Task",
                            to: null,
                            action: handleOpenAdd,
                            icon: <AddIcon />,
                            color:
                              "linear-gradient(135deg, #1CB5E0 0%, #000851 100%)",
                            visible: true,
                          },
                          {
                            label: "Users",
                            to: "/dashboard/users-table",
                            action: null,
                            icon: <GroupIcon />,
                            color:
                              "linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)",
                            visible: true,
                          },
                          {
                            label: "Roles",
                            to: "/dashboard/roles",
                            action: null,
                            icon: <SecurityIcon />,
                            color:
                              "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
                            visible: true,
                          },
                        ]
                          .filter((link) => link.visible)
                          .map((link, i) => (
                            <Grid item xs={12} sm={6} md={4} key={i}>
                              <Card
                                onClick={
                                  link.action
                                    ? link.action
                                    : () => navigate(link.to)
                                }
                                sx={{
                                  p: { xs: 2, md: 2.5 },
                                  borderRadius: "20px",
                                  cursor: "pointer",
                                  background: "rgba(255,255,255,0.7)",
                                  backdropFilter: "blur(10px)",
                                  border: "1px solid rgba(255,255,255,0.3)",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: { xs: 1.5, md: 2 },
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow:
                                      "0 12px 24px rgba(0, 8, 81, 0.1)",
                                    background: "#fff",
                                    "& .link-icon": {
                                      background: link.color,
                                      color: "#fff",
                                    },
                                  },
                                }}
                              >
                                <Avatar
                                  className="link-icon"
                                  sx={{
                                    bgcolor: alpha("#1CB5E0", 0.1),
                                    color: "#1CB5E0",
                                    width: { xs: 38, md: 45 },
                                    height: { xs: 38, md: 45 },
                                    transition: "all 0.3s ease",
                                  }}
                                >
                                  {link.icon}
                                </Avatar>
                                <Typography
                                  fontWeight={700}
                                  color="#000851"
                                  sx={{
                                    fontSize: { xs: "0.9rem", sm: "1rem" },
                                  }}
                                >
                                  {link.label}
                                </Typography>
                              </Card>
                            </Grid>
                          ))}
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <GlassPaper>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 3,
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            setCurrentDate(
                              new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth() - 1,
                                1,
                              ),
                            )
                          }
                          size={isPhone ? "small" : "medium"}
                        >
                          <ChevronLeft />
                        </IconButton>
                        <Typography
                          fontWeight={800}
                          color="#000851"
                          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                        >
                          {monthYear}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            setCurrentDate(
                              new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth() + 1,
                                1,
                              ),
                            )
                          }
                          size={isPhone ? "small" : "medium"}
                        >
                          <ChevronRight />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(7, 1fr)",
                          gap: 1,
                        }}
                      >
                        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                          <Typography
                            key={d}
                            variant="caption"
                            fontWeight={900}
                            color="text.disabled"
                            textAlign="center"
                            sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                          >
                            {d}
                          </Typography>
                        ))}
                        {calendarDays.map((day, i) => (
                          <CalendarDay
                            key={i}
                            isToday={
                              day === today.getDate() &&
                              currentDate.getMonth() === today.getMonth()
                            }
                            isSelected={
                              selectedDate && day === selectedDate.getDate()
                            }
                            onClick={() =>
                              day &&
                              setSelectedDate(
                                new Date(
                                  currentDate.getFullYear(),
                                  currentDate.getMonth(),
                                  day,
                                ),
                              )
                            }
                            sx={{
                              width: { xs: "32px", sm: "36px" },
                              height: { xs: "32px", sm: "36px" },
                              fontSize: { xs: "0.75rem", sm: "0.85rem" },
                            }}
                          >
                            {day || ""}
                          </CalendarDay>
                        ))}
                      </Box>
                    </GlassPaper>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          ) : (
            <Outlet />
          )}
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: 2,
            minWidth: { xs: "280px", sm: "320px" },
          },
        }}
      >
        <DialogTitle
          sx={{ fontWeight: 800, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
        >
          Add New Task
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            placeholder="What needs to be done?"
            variant="standard"
            sx={{ mt: 1 }}
            InputProps={{
              disableUnderline: true,
              sx: { bgcolor: "#f8faff", p: 2, borderRadius: "12px" },
            }}
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Button
            onClick={() => setOpenDialog(false)}
            color="inherit"
            sx={{ fontWeight: 700, width: { xs: "100%", sm: "auto" } }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveTask}
            sx={{
              background: "#0f4dbeff",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              px: { xs: 2, sm: 3 },
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              boxShadow: "0 8px 16px rgba(28, 181, 224, 0.2)",
            }}
          >
            Save Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
