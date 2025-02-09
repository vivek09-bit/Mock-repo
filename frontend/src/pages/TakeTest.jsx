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

  useEffect(() => {
    axios.get(`http://localhost:5000/api/test/${testId}`)
      .then((response) => {
        setTest(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load test. Please try again.");
        setLoading(false);
      });
  }, [testId]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:5000/api/test/submit", { testId, answers })
      .then((response) => {
        navigate(`/quiz-result`, { state: { result: response.data } }); // Redirect to result page
      })
      .catch((err) => {
        setError("Submission failed. Try again.");
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
