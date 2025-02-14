import React from 'react';
import { useLocation } from 'react-router-dom';

const TestResult = () => {
  const location = useLocation();
  const { result } = location.state || {};  // Get result data passed from the TakeTest page
  
  // Check if the result is available
  if (!result) {
    return <p>Error: No result data available.</p>;
  }

  return (
    <div>
      <h2>Test Submission Result</h2>
      <p><strong>Test Name:</strong> {result.testName}</p>
      <p><strong>Score:</strong> {result.score}%</p>
      <p><strong>Status:</strong> {result.passed ? 'Passed' : 'Failed'}</p>
      <p><strong>Total Questions:</strong> {result.totalQuestions}</p>
      <p><strong>Correct Answers:</strong> {result.correctAnswers}</p>
      
      <h3>Attempted Questions</h3>
      {/* <ul>
        {result.attemptedQuestions.map((item, index) => (
          <li key={index}>
            <p><strong>Question {index + 1}:</strong> {item.questionText}</p>
            <p><strong>Selected Option:</strong> {item.selectedOption}</p>
            <p><strong>Correct Answer:</strong> {item.isCorrect ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default TestResult;
