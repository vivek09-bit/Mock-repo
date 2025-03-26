import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Login.css"; // Custom styles for the dark theme

const Login = () => {
  const [formData, setFormData] = useState({ emailOrUsername: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      if (!response.data.token) {
        throw new Error("Token not received");
      }

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate(`/profile/${response.data.user.username}`);
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-dark">
      <form onSubmit={handleSubmit}>
        {/* <h2 className="sr-only">Login Form</h2> */}
        <h2 className="">Login Form</h2>

        {/* Lock Icon */}
        <div className="illustration">
          <i className="icon ion-ios-locked-outline"></i>
        </div>

        {/* Email/Username Field */}
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="emailOrUsername"
            placeholder="Email or Username"
            value={formData.emailOrUsername}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Error Message */}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {/* Login Button */}
        <div className="form-group">
          <button id="design"className="" type="submit">
            Log In
          </button>
        </div>

        {/* Forgot Password */}
        <a href="/register" className="Register">
          create an account?
        </a>
      </form>
    </div>
  );
};

export default Login;
