import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/registration.css";

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

    try {
      const response = await axios.post(
        "https://mock-repo-backend.onrender.com/api/auth/register",
        formData
      );
      setSuccess(response.data.message);
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        termsAccepted: false,
      });
      navigate("/login"); // Ensure /login route exists
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="registration-dark">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">Register</h2>
        <div className="form-icon">
          <span><i className="icon icon-user"></i></span>
        </div>
        <div className="form-group">
          <input type="text" className="form-control item" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control item" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        </div>
        <div className="form-group">
          <input type="password" className="form-control item" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control item" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control item" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
        </div>
        <div className="form-group">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
            <label className="form-check-label" htmlFor="termsAccepted">I accept the terms and conditions</label>
          </div>
        </div>
        <div className="form-group">
          <button id="design" type="submit" className="create-account">Create Account</button>
        </div>
        <a href="#" className="forgot">Forget Account Password</a>
        <a href="/login" className="forgot">Already have an account?</a>
      </form>
    </div>
  );
};

export default Register;
