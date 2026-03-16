import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Grow,
  Avatar,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function AboutUs() {
  const features = [
    {
      icon: <GroupsIcon sx={{ fontSize: 38 }} />,
      title: "Our Community",
      text: "Join thousands of users who trust Todo Flow to manage their daily lives and professional tasks.",
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 38 }} />,
      title: "Smart Solutions",
      text: "We leverage modern design patterns to provide a seamless and intuitive task management experience.",
    },
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 38 }} />,
      title: "Fast Growth",
      text: "Continuously evolving with new features powered by user feedback and cutting-edge technology.",
    },
    {
      icon: <AssignmentIcon sx={{ fontSize: 38 }} />,
      title: "Our Mission",
      text: "To empower every individual and organization to achieve more by providing the most seamless, intuitive, and reliable productivity tools.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f7ff 0%, #e0efff 100%)",
        py: { xs: 6, md: 10 },
        px: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(28, 181, 224, 0.08) 0%, rgba(28, 181, 224, 0) 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "-5%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 8, 81, 0.05) 0%, rgba(0, 8, 81, 0) 70%)",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Grow in timeout={1000}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              mt={10}
              sx={{
                fontWeight: 800,
                background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2.0rem", md: "2.5rem", lg: "3.0rem" },
              }}
            >
              Organize Your Life with Todo Flow
            </Typography>
          </Grow>
          <Grow in timeout={1500}>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: "700px",
                mx: "auto",
                lineHeight: 1.5,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              We're more than just a task list. We're your partner in
              productivity, designed to keep you focused on what truly matters.
            </Typography>
          </Grow>
        </Box>

        <Box
          sx={{
            mt: 10,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          {features.map((feature, index) => (
            <Grow in timeout={1000 + index * 500} key={index}>
              <Card
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "32px",
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.8)",
                  boxShadow: "0 15px 35px rgba(0, 8, 81, 0.05)",
                  transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  cursor: "pointer",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-15px)",
                    boxShadow: "0 25px 50px rgba(0, 8, 81, 0.12)",
                    background: "#ffffff",
                    "& .feature-avatar": {
                      transform: "scale(1.1) rotate(5deg)",
                      boxShadow: "0 12px 24px rgba(28, 181, 224, 0.4)",
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 3, textAlign: "center", flexGrow: 1 }}>
                  <Avatar
                    className="feature-avatar"
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 3,
                      background:
                        "linear-gradient(135deg, #1CB5E0 0%, #000851 100%)",
                      boxShadow: "0 8px 20px rgba(28, 181, 224, 0.2)",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 1.5, fontSize: "1.1rem" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
