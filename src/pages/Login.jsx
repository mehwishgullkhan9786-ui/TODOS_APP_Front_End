// Login.js:
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../Style Css/LoginForm.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter details");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        console.log("Token saved, moving to dashboard...");

        window.location.href = "/dashboard";
      }
    } catch (err) {
      alert("Login Failed: " + (err.response?.data?.message || "Error"));
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="text-center mb-4 login-title">Welcome Back</h2>
        <p className="text-center mb-4 text-muted">
          Please login to your account
        </p>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 login-btn">
            Sign In
          </Button>
          <p className="text-center mt-4  text-muted">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Login;
