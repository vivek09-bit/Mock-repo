import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    termsAccepted: false,
  });
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      setSuccess(response.data.message);
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        termsAccepted: false,
      });
      navigate(`/login/`); 
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>
          <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required />
          Accept Terms and Conditions
        </label>
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;