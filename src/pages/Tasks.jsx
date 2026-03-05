import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  IconButton,
  Card,
  Chip,
  Checkbox,
  InputAdornment,
  MenuItem,
  Menu,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon,
  RadioButtonUnchecked as UncheckedIcon,
  FilterList as FilterIcon,
  MoreVert as MoreIcon,
  Assignment as TaskIcon,
} from "@mui/icons-material";

const mainGradient = "linear-gradient(90deg, #000851 0%, #1cb5e0 100%)";

const TaskCard = styled(Card)(({ completed }) => ({
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  borderLeft: `6px solid ${completed ? "#2ecc71" : "#1cb5e0"}`,
  transition: "all 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
}));

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Redesign the Landing Page",
      category: "Work",
      completed: false,
      date: "2026-02-25",
    },
    {
      id: 2,
      text: "Meet with Client for Feedback",
      category: "Urgent",
      completed: true,
      date: "2026-02-20",
    },
    {
      id: 3,
      text: "Buy Groceries",
      category: "Personal",
      completed: false,
      date: "2026-02-21",
    },
    {
      id: 4,
      text: "Fix Sidebar Responsiveness",
      category: "Work",
      completed: false,
      date: "2026-02-22",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      text: taskInput,
      category: "Personal",
      completed: false,
      date: new Date().toISOString().split("T")[0],
    };
    setTasks([newTask, ...tasks]);
    setTaskInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || t.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mt: 4, px: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          background: mainGradient,
          color: "white",
          mb: 4,
          boxShadow: "0 10px 30px rgba(0,8,81,0.2)",
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={8}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TaskIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h4" fontWeight={800}>
                  Tasks Flow
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Organize your work and life, one task at a time.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: { xs: "flex-start", sm: "flex-end" },
              }}
            >
              <Chip
                label={`Total: ${tasks.length}`}
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: 700,
                }}
              />
              <Chip
                label={`Done: ${tasks.filter((t) => t.completed).length}`}
                sx={{
                  bgcolor: "rgba(46,204,113,0.3)",
                  color: "white",
                  fontWeight: 700,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Control Bar */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="New task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
          sx={{ bgcolor: "white", borderRadius: "10px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={handleAddTask}
                  variant="contained"
                  sx={{
                    background: mainGradient,
                    textTransform: "none",
                    borderRadius: "8px",
                  }}
                >
                  Add Task
                </Button>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", gap: 2, minWidth: { md: "400px" } }}>
          <TextField
            fullWidth
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ bgcolor: "white", borderRadius: "10px" }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "#000851", mr: 1 }} />,
            }}
          />
          <TextField
            select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ minWidth: 120, bgcolor: "white", borderRadius: "10px" }}
          >
            {["All", "Work", "Personal", "Urgent"].map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      {/* Task List */}
      <Grid container spacing={2}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} key={task.id}>
            <TaskCard completed={task.completed}>
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <Checkbox
                    icon={<UncheckedIcon />}
                    checkedIcon={<CheckIcon sx={{ color: "#2ecc71" }} />}
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                </Grid>
                <Grid item xs={7}>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        color: task.completed ? "#95a5a6" : "#2c3e50",
                        fontSize: "1.1rem",
                      }}
                    >
                      {task.text}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Due: {task.date}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Chip
                    label={task.category}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      bgcolor:
                        task.category === "Urgent"
                          ? "#ffebed"
                          : task.category === "Work"
                            ? "#e3f2fd"
                            : "#f0f2f5",
                      color:
                        task.category === "Urgent"
                          ? "#e74c3c"
                          : task.category === "Work"
                            ? "#1976d2"
                            : "#94a3b8",
                    }}
                  />
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "right" }}>
                  <IconButton
                    onClick={() => deleteTask(task.id)}
                    sx={{ color: "#e74c3c" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </TaskCard>
          </Grid>
        ))}
        {filteredTasks.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", py: 8, opacity: 0.5 }}>
              <Typography variant="h6">No tasks found!</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
