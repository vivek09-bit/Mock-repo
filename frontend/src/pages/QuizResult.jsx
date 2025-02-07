// import React from "react";
// import { useLocation } from "react-router-dom";
// import mockTestData from "./mockTestData"; // Make sure to import your mock data

// const QuizResult = () => {
//   const { state } = useLocation();
//   const { userAnswers } = state || {};

//   if (!userAnswers) {
//     return <p>No answers found.</p>;
//   }

//   // Get the test data from mockTestData (we can find the correct answers here)
//   const test = mockTestData.tests[0]; // Assuming there’s only one test, adjust accordingly

//   // Check how many answers are correct
//   let correctAnswersCount = 0;
//   let totalQuestions = test.questions.length;

//   const resultDetails = userAnswers.map((userAnswer) => {
//     const question = test.questions.find(
//       (q) => q.question_id === userAnswer.questionId
//     );
//     const isCorrect = question.correct_answer === userAnswer.answer;
//     if (isCorrect) correctAnswersCount++;

//     return {
//       question: question.question,
//       userAnswer: userAnswer.answer,
//       correctAnswer: question.correct_answer,
//       isCorrect,
//     };
//   });

//   return (
//     <div>
//       <h2>Quiz Results</h2>
//       <p>Total Questions: {totalQuestions}</p>
//       <p>Correct Answers: {correctAnswersCount}</p>
//       <p>Incorrect Answers: {totalQuestions - correctAnswersCount}</p>

//       <h3>Detailed Results:</h3>
//       <ul>
//         {resultDetails.map((result, index) => (
//           <li key={index}>
//             <strong>Question: </strong>{result.question}<br />
//             <strong>Your Answer: </strong>{result.userAnswer}{" "}
//             {result.isCorrect ? (
//               <span style={{ color: "green" }}>(Correct)</span>
//             ) : (
//               <span style={{ color: "red" }}>(Incorrect)</span>
//             )}
//             <br />
//             <strong>Correct Answer: </strong>{result.correctAnswer}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default QuizResult;


import React from "react";
import { useLocation } from "react-router-dom";
import mockTestData from "./mockTestData"; // Make sure to import your mock data

const QuizResult = () => {
  const { state } = useLocation();
  const { userAnswers } = state || {};

  if (!userAnswers) {
    return <p>No answers found.</p>;
  }

  // Get the test data from mockTestData (we can find the correct answers here)
  const test = mockTestData.tests[0]; // Assuming there’s only one test, adjust accordingly

  // Check how many answers are correct
  let correctAnswersCount = 0;
  let totalQuestions = test.questions.length;

  // Prepare the result details, ensuring every question is shown in the result
  const resultDetails = test.questions.map((question, index) => {
    const userAnswer = userAnswers.find(
      (answer) => answer.questionId === question.question_id
    );

    const isCorrect = userAnswer && question.correct_answer === userAnswer.answer;

    if (isCorrect) correctAnswersCount++;

    return {
      serialNumber: index + 1, // Serial number starts from 1
      question: question.question,
      userAnswer: userAnswer ? userAnswer.answer : "No Answer",
      correctAnswer: question.correct_answer,
      isCorrect,
    };
  });

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Total Questions: {totalQuestions}</p>
      <p>Correct Answers: {correctAnswersCount}</p>
      <p>Incorrect Answers: {totalQuestions - correctAnswersCount}</p>

      <h3>Detailed Results:</h3>
      <ul>
        {resultDetails.map((result, index) => (
          <li key={index}>
            <strong>Question {result.serialNumber}: </strong>{result.question}<br />
            <strong>Your Answer: </strong>{result.userAnswer}{" "}
            {result.isCorrect ? (
              <span style={{ color: "green" }}>(Correct)</span>
            ) : (
              <span style={{ color: "red" }}>(Incorrect)</span>
            )}
            <br />
            <strong>Correct Answer: </strong>{result.correctAnswer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizResult;
