import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "Student", // Default role (Instructor creation is handled by Admin)
    subscription_status: "inactive",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validatePassword(formData.password)) {
    alert("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", formData);
    alert(res.data.message);
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" name="phone" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" name="termsAccepted" className="form-check-input" onChange={handleChange} />
          <label className="form-check-label">Accept Terms & Conditions</label>
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
