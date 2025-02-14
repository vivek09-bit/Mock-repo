import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import "bootstrap/dist/css/bootstrap.min.css";

const COLORS = ["#28a745", "#dc3545"]; // Green for correct, red for incorrect

const TestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};

  if (!result) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger">No result data found!</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  const data = [
    { name: "Correct Answers", value: result.correctAnswers },
    { name: "Incorrect Answers", value: result.totalQuestions - result.correctAnswers },
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center text-primary">{result.testName}</h2>

        {/* Score Progress Bar */}
        <div className="mb-4">
          <label className="font-weight-bold">Score: {result.score}%</label>
          <div className="progress">
            <div
              className={`progress-bar ${result.passed ? "bg-success" : "bg-danger"}`}
              role="progressbar"
              style={{ width: `${result.score}%` }}
            >
              {result.score}%
            </div>
          </div>
        </div>

        {/* Pie Chart for Answer Distribution */}
        <div className="d-flex justify-content-center mb-4">
          <ResponsiveContainer width={300} height={250}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Test Details */}
        <ul className="list-group">
          <li className="list-group-item"><strong>Status:</strong> {result.passed ? "✅ Passed" : "❌ Failed"}</li>
          <li className="list-group-item"><strong>Total Questions:</strong> {result.totalQuestions}</li>
          <li className="list-group-item"><strong>Correct Answers:</strong> {result.correctAnswers}</li>
        </ul>

        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
