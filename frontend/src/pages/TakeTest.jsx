import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TakeTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  // Fetch Test and User Details
  useEffect(() => {
    const fetchTestAndUser = async () => {
      if (!token) {
        setError("User authentication required.");
        setLoading(false);
        return;
      }

      try {
        const [testRes, userRes] = await Promise.all([
          axios.get(`https://mock-repo-backend.onrender.com/api/test/${testId}`),
          axios.get("https://mock-repo-backend.onrender.com/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTest(testRes.data);
        setUser(userRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestAndUser();
  }, [testId, token]);

  // Timer for Questions
  useEffect(() => {
    if (!test || !test.questions) return;

    setTimeLeft(test.questions[currentQuestionIndex]?.timeLimit || 60);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, test]);

  // Detect Tab Switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => prev + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Show Warning Before Auto-Submit
  useEffect(() => {
    if (tabSwitchCount === 2) {
      alert("Warning: Switching tabs again will auto-submit your test.");
    } else if (tabSwitchCount > 2) {
      handleSubmit();
    }
  }, [tabSwitchCount]);

  const startTest = () => setShowGuidelines(false);

  const handleAnswerChange = (selectedOption) => {
    const questionId = test.questions[currentQuestionIndex]._id;
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      setError("User not authenticated.");
      return;
    }

    try {
      const response = await axios.post("https://mock-repo-backend.onrender.com/api/test/submit", {
        testId,
        userId: user.user._id,
        answers,
      });

      navigate("/Test-Submit", { state: { result: response.data } });
    } catch {
      setError("Submission failed. Try again.");
    }
  };

  if (loading)
    return (
      <div className="text-center">
        <p>Loading test...</p>
        <svg xmlns="http://www.w3.org/2000/svg" height="100px" width="100px" viewBox="0 0 200 200" className="pencil">
          <circle transform="rotate(-113,100,100)" strokeLinecap="round" strokeWidth="2" stroke="currentColor" fill="none" r="70"></circle>
        </svg>
      </div>
    );

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (showGuidelines)
    return (
      <div className="container">
        <h2>Test Guidelines</h2>
        <ul>
          <li>Read each question carefully.</li>
          <li>You have a limited time for each question.</li>
          <li>Switching tabs more than twice will auto-submit your test.</li>
        </ul>
        <button onClick={startTest} className="btn btn-primary">
          Start Test
        </button>
      </div>
    );

  const currentQuestion = test.questions[currentQuestionIndex];

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        {/* Test Name and Timer */}
        <h2 className="text-center text-primary">{test.name}</h2>
        <div className="d-flex justify-content-between align-items-center my-3">
          <p className="fw-bold text-danger">
            <i className="bi bi-clock"></i> Time Left: {timeLeft}s
          </p>
          <span className="badge bg-secondary fs-6">Question {currentQuestionIndex + 1}/{test.questions.length}</span>
        </div>

        {/* Question */}
        <div className="mb-4">
          <h5 className="fw-semibold">{currentQuestionIndex + 1}. {currentQuestion.questionText}</h5>
        </div>

        {/* Options */}
        <div className="list-group">
          {currentQuestion.options.map((option, idx) => (
            <label key={idx} className="list-group-item d-flex align-items-center">
              <input
                type="radio"
                className="form-check-input me-2"
                name={`question-${currentQuestion._id}`}
                value={idx}
                checked={answers[currentQuestion._id] === idx}
                onChange={() => handleAnswerChange(idx)}
              />
              <span className="fw-normal">{option}</span>
            </label>
          ))}
        </div>

        {/* Next/Submit Button */}
        <div className="d-flex justify-content-end mt-4">
          <button onClick={handleNextQuestion} className="btn btn-success px-4">
            {currentQuestionIndex < test.questions.length - 1 ? "Next" : "Submit"} <i className="bi bi-arrow-right-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeTest;
