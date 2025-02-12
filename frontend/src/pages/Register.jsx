import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./registration.css";
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
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 
               err.message || 
               "Registration failed");
    }
  };

  return (
    <>
      <div  className="registration-dark">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    
      <form onSubmit={handleSubmit}>
      <h2>Register</h2>
    
            <div className="form-icon">
                <span><i className="icon icon-user"></i></span>
            </div>
            <div className="form-group">
                <input type="text" className="form-control item" name="name" value={formData.name} onChange={handleChange}  placeholder="name" />
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
                <button type="submit" className="btn btn-block create-account">Create Account</button>
            </div>
            <a href="/login" className="login">
          already have an account?
        </a>
        </form>
     </div>
     </>
    
  );
};

export default Register;