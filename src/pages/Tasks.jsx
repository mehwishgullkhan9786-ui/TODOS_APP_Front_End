import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
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
  Avatar,
  Fade,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
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

const TaskCard = styled(Card)(({ theme, completed }) => ({
  padding: theme.spacing(2),
  borderRadius: "18px",
  background: completed
    ? "rgba(255, 255, 255, 0.4)"
    : "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 4px 20px rgba(0, 8, 81, 0.03)",
  transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    transform: "translateX(8px)",
    boxShadow: "20px 0 40px rgba(28, 181, 224, 0.08)",
    background: "#fff",
    border: "1px solid rgba(28, 181, 224, 0.2)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "4px",
    background: completed
      ? "linear-gradient(180deg, #2ecc71, #27ae60)"
      : "linear-gradient(180deg, #1cb5e0, #000851)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
    borderRadius: "14px",
  },
}));

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [taskInput, setTaskInput] = useState("");
  const [taskCategoryInput, setTaskCategoryInput] = useState("Personal");
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:5000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(res.data.map((t) => ({ ...t, id: t._id })));
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!taskInput.trim()) return;

    const token = localStorage.getItem("token");

    try {
      console.log("DEBUG: Sending to server ->", {
        text: taskInput,
        category: taskCategoryInput,
      });
      const res = await axios.post(
        "http://localhost:5000/tasks",
        {
          text: taskInput,
          category: taskCategoryInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("DEBUG: Server responded with ->", res.data);
      setTasks([{ ...res.data, id: res.data._id }, ...tasks]);

      setTaskInput("");
      setTaskCategoryInput("Personal");
      setOpenAdd(false);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `http://localhost:5000/tasks/${id}`,
        { completed: !task.completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTasks(
        tasks.map((t) => (t.id === id ? { ...res.data, id: res.data._id } : t)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || t.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1000,
        mt: 4,
        px: { xs: 2, md: 4 },
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
                    <TaskIcon sx={{ fontSize: { xs: 24, md: 32 } }} />
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
                      Tasks Flow
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
                      Master your productivity, one step at a time.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                    justifyContent: { xs: "flex-start", md: "flex-end" },
                    flexWrap: "wrap",
                    ml : 18,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                    }}
                  >
                    <Chip
                      label={`${tasks.length} Total`}
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
                    <Chip
                      label={`${tasks.filter((t) => t.completed).length} Done`}
                      size="small"
                      sx={{
                        bgcolor: "rgba(46,204,113,0.3)",
                        color: "white",
                        fontWeight: 700,
                        borderRadius: "10px",
                        height: "32px",
                        fontSize: { xs: "0.7rem", sm: "0.75rem" },
                      }}
                    />
                  </Box>
                  <Button
                    onClick={() => setOpenAdd(true)}
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
                    Add Task
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
              fontWeight={800}
              color="#000851"
              sx={{ opacity: 0.8, fontSize: "1.2rem" }}
            >
              Recent Tasks
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: { xs: "100%", md: "auto" },
              }}
            >
              <TextField
                placeholder="Find a task..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  minWidth: { md: 300 },
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.7)",
                    borderRadius: "16px",
                    height: "44px",
                    fontSize: "0.9rem",
                    "& fieldset": { border: "1px solid rgba(0,0,0,0.05)" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <SearchIcon
                      sx={{ color: "#1CB5E0", mr: 1, fontSize: 18 }}
                    />
                  ),
                }}
              />
              <TextField
                select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                sx={{
                  minWidth: 120,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.7)",
                    borderRadius: "16px",
                    height: "44px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    "& fieldset": { border: "1px solid rgba(0,0,0,0.05)" },
                  },
                }}
              >
                {["All", "Work", "Personal", "Urgent"].map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          <Grid container spacing={2.5}>
            {filteredTasks.map((task) => (
              <Grid item xs={12} key={task.id}>
                <TaskCard completed={task.completed}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      gap: { xs: 1, sm: 2 },
                    }}
                  >
                    <Checkbox
                      icon={
                        <UncheckedIcon
                          sx={{
                            fontSize: { xs: 24, sm: 30 },
                            color: alpha("#000851", 0.1),
                          }}
                        />
                      }
                      checkedIcon={
                        <CheckIcon
                          sx={{
                            fontSize: { xs: 24, sm: 30 },
                            color: "#2ecc71",
                          }}
                        />
                      }
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          color: task.completed
                            ? alpha("#000851", 0.4)
                            : "#000851",
                          fontSize: { xs: "1rem", md: "1.15rem" },
                          lineHeight: 1.3,
                        }}
                      >
                        {task.text}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          opacity: 0.5,
                          fontSize: { xs: "0.75rem", sm: "0.8rem" },
                        }}
                      >
                        Created on {task.date}
                      </Typography>
                    </Box>
                    <Chip
                      label={task.category}
                      size="small"
                      sx={{
                        display: { xs: "none", sm: "flex" },
                        fontWeight: 900,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        bgcolor:
                          task.category === "Urgent"
                            ? alpha("#e74c3c", 0.1)
                            : task.category === "Work"
                              ? alpha("#1CB5E0", 0.1)
                              : alpha("#000851", 0.05),
                        color:
                          task.category === "Urgent"
                            ? "#e74c3c"
                            : task.category === "Work"
                              ? "#1CB5E0"
                              : "#000851",
                        border: "1px solid rgba(0,0,0,0.05)",
                      }}
                    />
                    <IconButton
                      onClick={() => deleteTask(task.id)}
                      sx={{
                        color: alpha("#e74c3c", 0.5),
                        "&:hover": {
                          color: "#e74c3c",
                          bgcolor: alpha("#e74c3c", 0.1),
                        },
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                    </IconButton>
                  </Box>
                </TaskCard>
              </Grid>
            ))}
            {filteredTasks.length === 0 && (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  py: 12,
                  background: "rgba(255,255,255,0.4)",
                  borderRadius: "24px",
                  border: "2px dashed rgba(0, 8, 81, 0.05)",
                }}
              >
                <TaskIcon
                  sx={{ fontSize: 60, color: "rgba(0, 8, 81, 0.1)", mb: 2 }}
                />
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: "rgba(0, 8, 81, 0.4)" }}
                >
                  All caught up!
                </Typography>
                <Typography
                  sx={{ color: "rgba(0, 8, 81, 0.3)", fontSize: "0.9rem" }}
                >
                  Your task list is empty. Time to relax or start something new.
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>
      </Fade>

      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: 1,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "450px",
          },
        }}
      >
        <DialogTitle
          sx={{ fontWeight: 800, color: "#000851", fontSize: "1.4rem" }}
        >
          Add New Task
        </DialogTitle>
        <DialogContent
          sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            fullWidth
            label="What needs to be done?"
            variant="outlined"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                bgcolor: "#fff",
              },
            }}
          />
          <TextField
            select
            fullWidth
            label="Category"
            value={taskCategoryInput}
            onChange={(e) => setTaskCategoryInput(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                bgcolor: "#fff",
              },
            }}
          >
            {["Work", "Personal", "Urgent"].map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1.5 }}>
          <Button
            onClick={() => setOpenAdd(false)}
            sx={{
              fontWeight: 700,
              color: alpha("#000851", 0.5),
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddTask}
            sx={{
              background: "linear-gradient(135deg, #0a59c0ff 0%, #000851 100%)",
              borderRadius: "12px",
              fontWeight: 700,
              px: 4,
              textTransform: "none",
              boxShadow: "0 8px 16px rgba(10, 89, 192, 0.2)",
              "&:hover": {
                boxShadow: "0 12px 24px rgba(10, 89, 192, 0.3)",
              },
            }}
          >
            Save Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
