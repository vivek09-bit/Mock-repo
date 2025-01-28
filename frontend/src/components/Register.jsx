import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    userType: "student",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // For multi-step registration
  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate password strength
  const checkPasswordStrength = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Step 1 validation
    if (currentStep === 1) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!validateEmail(formData.email)) newErrors.email = "Invalid email";
      if (!checkPasswordStrength(formData.password))
        newErrors.password =
          "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.";
    }

    // Step 2 validation
    if (currentStep === 2 && !formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form on final step
    if (currentStep === 2) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          formData
        );
        if (response.status === 201) {
          alert("Registration successful! Please login.");
          navigate("/login");
        }
      } catch (err) {
        setErrors({
          server: err.response?.data?.message || "Registration failed. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep(currentStep + 1); // Move to the next step
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register</h2>
              {errors.server && (
                <div className="alert alert-danger">{errors.server}</div>
              )}

              {/* Progress Bar */}
              <div className="progress mb-4">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${(currentStep / 2) * 100}%` }}
                ></div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Account Info */}
                {currentStep === 1 && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      {errors.name && (
                        <div className="text-danger">{errors.name}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {errors.email && (
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <div className="form-check mt-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="showPassword"
                          checked={showPassword}
                          onChange={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="showPassword" className="form-check-label">
                          Show Password
                        </label>
                      </div>
                      {errors.password && (
                        <div className="text-danger">{errors.password}</div>
                      )}
                    </div>
                  </>
                )}

                {/* Step 2: Terms and Conditions */}
                {currentStep === 2 && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="userType" className="form-label">
                        User Type
                      </label>
                      <select
                        className="form-select"
                        id="userType"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        required
                      >
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                      </select>
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="termsAccepted"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="termsAccepted" className="form-check-label">
                        I accept the terms and conditions
                      </label>
                      {errors.termsAccepted && (
                        <div className="text-danger">{errors.termsAccepted}</div>
                      )}
                    </div>
                  </>
                )}

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      Previous
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : currentStep === 2 ? (
                      "Register"
                    ) : (
                      "Next"
                    )}
                  </button>
                </div>
              </form>

              {/* Social Login Buttons */}
              <div className="mt-4 text-center">
                <p className="mb-3">Or register with:</p>
                <button className="btn btn-outline-danger me-2">
                  <i className="fab fa-google"></i> Google
                </button>
                <button className="btn btn-outline-primary">
                  <i className="fab fa-facebook"></i> Facebook
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center mt-4">
                Already have an account? <a href="/login">Login here</a>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;