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

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User authentication required.");
      return;
    }
  
    axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const userId = response.data.user._id;
  
        axios.post("http://localhost:5000/api/test/submit", { testId, userId, answers })
          .then((response) => {
            navigate(`/Test-Submit`, { state: { result: response.data } });
          })
          .catch(() => setError("Submission failed. Try again."));
      })
      .catch(() => setError("User authentication required."));
  };
  

  return (
    <div>
      <h2>{test.name}</h2>
      {test.questionSets.map((set) => (
        set.setId.questions.slice(0, set.numToPick).map((q, index) => (
          <div key={q._id}>
            <p><strong>Q{index + 1}:</strong> {q.questionText}</p>
            {q.options.map((option, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name={`question-${q._id}`}
                  value={idx}
                  checked={answers[q._id] === idx}
                  onChange={() => handleAnswerChange(q._id, idx)}
                />
                {option}
              </label>
            ))}
          </div>
        ))
      ))}
      <button onClick={handleSubmit} className="btn btn-success">Submit Test</button>
    </div>
  );
  
};

export default Register;