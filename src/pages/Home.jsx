import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Fade,
  Grow,
  Avatar,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TargetIcon from "@mui/icons-material/MyLocation";

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f7ff 0%, #e0efff 100%)",
        display: "flex",
        alignItems: "center",
        pt: { xs: 12, md: 0 },
        pb: { xs: 8, md: 0 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(28, 181, 224, 0.1) 0%, rgba(28, 181, 224, 0) 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          left: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 8, 81, 0.06) 0%, rgba(0, 8, 81, 0) 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    lineHeight: 1.1,
                    mb: 2,
                    fontSize: {
                      xs: "2.4rem",
                      sm: "3.2rem",
                      md: "3.8rem",
                      lg: "4.5rem",
                    },
                    textAlign: { xs: "center", md: "left" },
                    background:
                      "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  To Do List <br />
                  <span style={{ fontSize: "0.8em", opacity: 0.9 }}>
                    Web App
                  </span>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: "#000851",
                    fontWeight: 700,
                    mb: 3,
                    letterSpacing: "-0.5px",
                    opacity: 0.8,
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Welcome to Your Smart Task Manager
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    lineHeight: 1.7,
                    mb: 5,
                    maxWidth: "500px",
                    mx: { xs: "auto", md: 0 },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Stay organized, track deadlines, and boost your productivity.
                  Plan smarter, work faster, and stay in total control of your
                  daily schedule with Todo Flow.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Button
                    component={Link}
                    to="/SignUp"
                    variant="outlined"
                    sx={{
                      px: { xs: 2.2, sm: 5 },
                      py: { xs: 1, sm: 1.8 },
                      borderRadius: "100px",
                      fontWeight: 800,
                      color: "white",
                      borderWidth: "2px",
                      textTransform: "none",
                      fontSize: { xs: "0.8rem", sm: "1.05rem" },
                      background: "linear-gradient(90deg, #1CB5E0 0%)",
                      boxShadow: "0 10px 25px rgba(0, 8, 81, 0.2)",
                      minWidth: { xs: "130px", sm: "auto" },
                      "&:hover": {
                        transform: "translateY(-3px)",
                        background: "none",
                        color: "#1CB5E0",
                        borderColor: "#1CB5E0",
                        background: "rgba(28, 181, 224, 0.05)",
                      },
                      transition:
                        "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      px: { xs: 2.2, sm: 4 },
                      py: { xs: 1, sm: 1.8 },
                      borderRadius: "100px",
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: { xs: "0.8rem", sm: "1.05rem" },
                      borderColor: "#1CB5E0",
                      color: "#1CB5E0",
                      borderWidth: "2px",
                      minWidth: { xs: "130px", sm: "auto" },
                      "&:hover": {
                        borderWidth: "2px",
                        borderColor: " rgba(0, 8, 81, 0.2)",
                        background: "rgba(28, 181, 224, 0.05)",
                        background: "linear-gradient(90deg, #1CB5E0 0%)",
                        transform: "translateY(-3px)",
                        color: "white",
                        boxShadow: "0 10px 25px rgba(0, 8, 81, 0.2)",
                      },
                      transition:
                        "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    Free Trial 30 Days
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              order: { xs: -1, md: 1 },
              mb: { xs: 4, md: 0 },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: "260px", sm: "320px", md: "400px" },
                height: { xs: "300px", sm: "380px", md: "450px" },
                transform: {
                  xs: "scale(0.8)",
                  sm: "scale(0.9)",
                  md: "scale(1)",
                },
                transition: "all 0.5s ease",
                mx: "auto",
              }}
            >
              <Grow in timeout={1500}>
                <Paper
                  elevation={20}
                  sx={{
                    width: { xs: "160px", sm: "200px", md: "220px" },
                    height: { xs: "300px", sm: "360px", md: "400px" },
                    mx: "auto",
                    borderRadius: "35px",
                    background:
                      "linear-gradient(135deg, #000851 0%, #1CB5E0 100%)",
                    border: "8px solid #000851",
                    position: "relative",
                    boxShadow: "0 40px 80px rgba(0, 8, 81, 0.25)",
                    overflow: "hidden",
                    display: { xs: "block", sm: "block" },
                  }}
                >
                  <Box
                    sx={{
                      width: "40px",
                      height: "4px",
                      bgcolor: "#000851",
                      mx: "auto",
                      mt: 2,
                      borderRadius: 2,
                    }}
                  />
                </Paper>
              </Grow>

              <Grow in timeout={2000}>
                <Paper
                  sx={{
                    position: "absolute",
                    top: "15%",
                    right: { xs: "-5%", sm: "5%" },
                    width: { xs: "170px", sm: "210px" },
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: "24px",
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(255,255,255,1)",
                    zIndex: 2,
                    animation: "float 4s ease-in-out infinite",
                    "@keyframes float": {
                      "0%, 100%": { transform: "translateY(0)" },
                      "50%": { transform: "translateY(-15px)" },
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      color: "#000851",
                      textAlign: "center",
                      textTransform: "uppercase",
                      fontSize: { xs: "0.75rem", sm: "0.85rem" },
                    }}
                  >
                    My Daily Tasks
                  </Typography>
                  {[1, 2, 3, 4].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.2,
                        mb: 1.2,
                      }}
                    >
                      <CheckCircleIcon
                        sx={{
                          color: i <= 2 ? "#1CB5E0" : "#eee",
                          fontSize: { xs: 18, sm: 20 },
                        }}
                      />
                      <Box
                        sx={{
                          height: "5px",
                          width: "100%",
                          bgcolor: "#f0f0f0",
                          borderRadius: 1,
                        }}
                      />
                    </Box>
                  ))}
                </Paper>
              </Grow>

              <Fade in timeout={2500}>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: { xs: "5%", sm: "20%" },
                    right: { xs: "5%", sm: "-10%", md: "-15%" },
                    fontSize: { xs: "45px", sm: "60px", md: "70px" },
                    zIndex: 3,
                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                    animation: "floatSlow 5s ease-in-out infinite",
                    "@keyframes floatSlow": {
                      "0%, 100%": { transform: "rotate(0deg) translateY(0)" },
                      "50%": { transform: "rotate(10deg) translateY(-10px)" },
                    },
                  }}
                >
                  🎯
                </Box>
              </Fade>

              <Fade in timeout={2800}>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-5%",
                    left: { xs: "0%", sm: "5%" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    zIndex: 4,
                    animation: "floatSlow 6s ease-in-out infinite",
                    "@keyframes floatSlow": {
                      "0%, 100%": { transform: "translateY(0)" },
                      "50%": { transform: "translateY(-10px)" },
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 55, sm: 75 },
                      height: { xs: 55, sm: 75 },
                      bgcolor: "white",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      border: "3px solid #1CB5E0",
                      fontSize: { xs: "1.5rem", sm: "2rem" },
                    }}
                  >
                    👤
                  </Avatar>
                  <Box
                    sx={{
                      width: 40,
                      height: 8,
                      bgcolor: "rgba(0,0,0,0.1)",
                      borderRadius: "50%",
                      animation: "shadowScale 6s ease-in-out infinite",
                      "@keyframes shadowScale": {
                        "0%, 100%": { transform: "scale(1)", opacity: 0.1 },
                        "50%": { transform: "scale(0.8)", opacity: 0.05 },
                      },
                    }}
                  />
                </Box>
              </Fade>

              <Fade in timeout={3000}>
                <Avatar
                  sx={{
                    position: "absolute",
                    top: "0%",
                    left: "10%",
                    width: { xs: 50, sm: 60 },
                    height: { xs: 50, sm: 60 },
                    background:
                      "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
                    boxShadow: "0 10px 25px rgba(255, 107, 107, 0.3)",
                    animation: "pulseScale 3s infinite ease-in-out",
                    "@keyframes pulseScale": {
                      "0%, 100%": { transform: "scale(1) translateY(0)" },
                      "50%": { transform: "scale(1.1) translateY(-5px)" },
                    },
                  }}
                >
                  <RocketLaunchIcon
                    sx={{ fontSize: { xs: 26, sm: 30 }, color: "white" }}
                  />
                </Avatar>
              </Fade>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1.5,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: i === 2 ? 30 : 10,
              height: 10,
              borderRadius: 5,
              bgcolor: i === 2 ? "#1CB5E0" : "rgba(0, 8, 81, 0.1)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LandingPage;
