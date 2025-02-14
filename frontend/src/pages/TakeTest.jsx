import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TakeTest = () => {
  const { testId } = useParams(); // Get the test ID from URL
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // Add this line
  const token = localStorage.getItem("authToken");


  useEffect(() => {
    // Fetch test details
    axios.get(`http://localhost:5000/api/test/${testId}`)
      .then((response) => {
        console.log(response.data);
        
        setTest(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load test. Please try again.");
        setLoading(false);
      });
  
    // Fetch logged-in user details
    if (token) {
      axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUser(response.data)) // Now setUser is defined ✅
      .catch(() => setError("User authentication required."));
    } else {
      setError("User authentication required.");
    }
  }, [testId]);
  
  

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };


  
  const handleSubmit = () => {
    if (!user) {
        setError("User not authenticated. Please log in.");
        return;
    }

    const token = localStorage.getItem("authToken");  
    if (!token) {
        console.error("🚨 No token found in localStorage");
        setError("Authentication error. Please log in again.");
        return;
    }

    axios.post("http://localhost:5000/api/test/submit", 
        { testId, userId: user._id, answers }, // ✅ Ensure answers are included
        {
            headers: { Authorization: `Bearer ${token}` } // ✅ Send token in headers
        }
    )
    .then((response) => {
        navigate(`/Test-Submit`, { state: { result: response.data } });
    })
    .catch((err) => {
        console.error("Submission error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Submission failed. Try again.");
    });
};



  if (loading) return <p>Loading test...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>{test.name}</h2>
      {test.questions.map((q, index) => (
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
      ))}
      <button onClick={handleSubmit} className="btn btn-success">Submit Test</button>
    </div>
  );
};

export default TakeTest;
