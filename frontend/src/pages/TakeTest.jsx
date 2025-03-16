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
      try {
        const [testRes, userRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/test/${testId}`),
          token
            ? axios.get("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
              })
            : Promise.reject("User authentication required."),
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

  useEffect(() => {
    if (tabSwitchCount > 2) handleSubmit();
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
    if (!user) return setError("User not authenticated.");

    try {
      const response = await axios.post("http://localhost:5000/api/test/submit", {
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
      <svg xmlns="http://www.w3.org/2000/svg" height="200px" width="200px" viewBox="0 0 200 200" class="pencil">
        <defs>
          <clipPath id="pencil-eraser">
            <rect height="30" width="30" ry="5" rx="5"></rect>
          </clipPath>
        </defs>
        <circle transform="rotate(-113,100,100)" stroke-linecap="round" stroke-dashoffset="439.82" stroke-dasharray="439.82 439.82" stroke-width="2" stroke="currentColor" fill="none" r="70" class="pencil__stroke"></circle>
        <g transform="translate(100,100)" class="pencil__rotate">
          <g fill="none">
            <circle transform="rotate(-90)" stroke-dashoffset="402" stroke-dasharray="402.12 402.12" stroke-width="30" stroke="hsl(223,90%,50%)" r="64" class="pencil__body1"></circle>
            <circle transform="rotate(-90)" stroke-dashoffset="465" stroke-dasharray="464.96 464.96" stroke-width="10" stroke="hsl(223,90%,60%)" r="74" class="pencil__body2"></circle>
            <circle transform="rotate(-90)" stroke-dashoffset="339" stroke-dasharray="339.29 339.29" stroke-width="10" stroke="hsl(223,90%,40%)" r="54" class="pencil__body3"></circle>
          </g>
          <g transform="rotate(-90) translate(49,0)" class="pencil__eraser">
            <g class="pencil__eraser-skew">
              <rect height="30" width="30" ry="5" rx="5" fill="hsl(223,90%,70%)"></rect>
              <rect clip-path="url(#pencil-eraser)" height="30" width="5" fill="hsl(223,90%,60%)"></rect>
              <rect height="20" width="30" fill="hsl(223,10%,90%)"></rect>
              <rect height="20" width="15" fill="hsl(223,10%,70%)"></rect>
              <rect height="20" width="5" fill="hsl(223,10%,80%)"></rect>
              <rect height="2" width="30" y="6" fill="hsla(223,10%,10%,0.2)"></rect>
              <rect height="2" width="30" y="13" fill="hsla(223,10%,10%,0.2)"></rect>
            </g>
          </g>
          <g transform="rotate(-90) translate(49,-30)" class="pencil__point">
            <polygon points="15 0,30 30,0 30" fill="hsl(33,90%,70%)"></polygon>
            <polygon points="15 0,6 30,0 30" fill="hsl(33,90%,50%)"></polygon>
            <polygon points="15 0,20 10,10 10" fill="hsl(223,10%,10%)"></polygon>
          </g>
        </g>
      </svg>
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

  return (<div className="container mt-5">
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