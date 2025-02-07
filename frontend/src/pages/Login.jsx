import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      
      console.log("API Response:", response.data); // Debugging log
  
      if (!response.data.token) {
        throw new Error("Token not received");
      }
  
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
  
      console.log("Stored Token:", localStorage.getItem("authToken")); // Verify storage
  
      navigate(`/profile/${response.data.user.username}`);
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };
    
  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <label>Email or Username:</label>
<input 
  type="text" 
  name="emailOrUsername" 
  value={formData.emailOrUsername} 
  onChange={handleChange} 
  required 
/>

        
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
