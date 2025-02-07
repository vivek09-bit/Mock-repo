// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Quiz = () => {
//   const { testId } = useParams();
//   const [test, setTest] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Mock test data (for testing purpose)
//     const mockTestData = {
//       tests: [
//         {
//           test_id: 1,
//           name: "JSON Basics Test",
//           subject: "JSON",
//           subcategory: "Basics",
//           section: "01",
//           questions: [
//             {
//               question_id: 1,
//               question: "JSON stands for _______.",
//               options: {
//                 A: "JavaScript Object Notation",
//                 B: "Java Object Notation",
//                 C: "JavaScript Object Normalization",
//                 D: "JavaScript Object-Oriented Notation",
//               },
//               answer: "A",
//             },
//             {
//               question_id: 3,
//               question: "Which data type is NOT supported by JSON?",
//               options: {
//                 A: "String",
//                 B: "Object",
//                 C: "Function",
//                 D: "Array",
//               },
//               answer: "C",
//             },
//           ],
//         },
//       ],
//     };

//     // Simulate fetching the test data
//     setTest(mockTestData);

//   }, [testId]);

//   const handleAnswerSelect = (option) => {
//     setSelectedAnswer(option);
//   };

//   const handleNextQuestion = () => {
//     if (selectedAnswer) {
//       setUserAnswers((prev) => [...prev, { questionId: test.tests[0].questions[currentQuestionIndex].question_id, answer: selectedAnswer }]);
//     }
//     setSelectedAnswer(null);
//     if (currentQuestionIndex < test.tests[0].questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       navigate("/quiz-result", { state: { userAnswers } });
//     }
//   };

//   const handleSubmitQuiz = () => {
//     console.log("Final answers", userAnswers);
//     navigate("/quiz-result", { state: { userAnswers } });
//   };

//   if (!test) return <p>Loading quiz...</p>;

//   const question = test.tests[0].questions[currentQuestionIndex];

//   return (
//     <div>
//       <h2>{test.tests[0].name}</h2>
//       <p>{question.question}</p>
//       <div>
//         {Object.keys(question.options).map((key) => (
//           <button
//             key={key}
//             onClick={() => handleAnswerSelect(key)}
//             style={{
//               backgroundColor: selectedAnswer === key ? "lightblue" : "white",
//             }}
//           >
//             {question.options[key]}
//           </button>
//         ))}
//       </div>
//       <div>
//         {currentQuestionIndex < test.tests[0].questions.length - 1 ? (
//           <button onClick={handleNextQuestion}>Next</button>
//         ) : (
//           <button onClick={handleSubmitQuiz}>Submit Quiz</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;








// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import mockTestData from "./mockTestData"; // Import the mock data

// const Quiz = () => {
//   const { testId } = useParams();
//   const [test, setTest] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulate fetching the test data from mockTestData.js
//     setTest(mockTestData);
//   }, [testId]);

//   const handleAnswerSelect = (option) => {
//     setSelectedAnswer(option);
//   };

//   const handleNextQuestion = () => {
//     if (selectedAnswer) {
//       setUserAnswers((prev) => [...prev, { questionId: test.tests[0].questions[currentQuestionIndex].question_id, answer: selectedAnswer }]);
//     }
//     setSelectedAnswer(null);
//     if (currentQuestionIndex < test.tests[0].questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       navigate("/quiz-result", { state: { userAnswers } });
//     }
//   };

//   const handleSubmitQuiz = () => {
//     console.log("Final answers", userAnswers);
//     navigate("/quiz-result", { state: { userAnswers } });
//   };

//   if (!test) return <p>Loading quiz...</p>;

//   const question = test.tests[0].questions[currentQuestionIndex];

//   return (
//     <div>
//       <h2>{test.tests[0].name}</h2>
//       <p>{question.question}</p>
//       <div>
//         {Object.keys(question.options).map((key) => (
//           <button
//             key={key}
//             onClick={() => handleAnswerSelect(key)}
//             style={{
//               backgroundColor: selectedAnswer === key ? "lightblue" : "white",
//             }}
//           >
//             {question.options[key]}
//           </button>
//         ))}
//       </div>
//       <div>
//         {currentQuestionIndex < test.tests[0].questions.length - 1 ? (
//           <button onClick={handleNextQuestion}>Next</button>
//         ) : (
//           <button onClick={handleSubmitQuiz}>Submit Quiz</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import mockTestData from "./mockTestData"; // Import the mock data

// const Quiz = () => {
//   const { testId } = useParams();
//   const [test, setTest] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulate fetching the test data from mockTestData.js
//     setTest(mockTestData);
//   }, [testId]);

//   const handleAnswerSelect = (option) => {
//     setSelectedAnswer(option);
//   };

//   const handleNextQuestion = () => {
//     if (selectedAnswer) {
//       setUserAnswers((prev) => [
//         ...prev,
//         { questionId: test.tests[0].questions[currentQuestionIndex].question_id, answer: selectedAnswer },
//       ]);
//     }
//     setSelectedAnswer(null);
//     if (currentQuestionIndex < test.tests[0].questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       navigate("/quiz-result", { state: { userAnswers } });
//     }
//   };

//   const handleSubmitQuiz = () => {
//     console.log("Final answers", userAnswers);
//     navigate("/quiz-result", { state: { userAnswers } });
//   };

//   if (!test) return <p>Loading quiz...</p>;

//   const question = test.tests[0].questions[currentQuestionIndex];

//   return (
//     <div>
//       <h2>{test.tests[0].name}</h2>
//       <p>{question.question}</p>
//       <div>
//         {Object.keys(question.options).map((key) => (
//           <button
//             key={key}
//             onClick={() => handleAnswerSelect(key)}
//             style={{
//               backgroundColor: selectedAnswer === key ? "lightblue" : "white",
//             }}
//           >
//             {question.options[key]}
//           </button>
//         ))}
//       </div>
//       <div>
//         {currentQuestionIndex < test.tests[0].questions.length - 1 ? (
//           <button onClick={handleNextQuestion}>Next</button>
//         ) : (
//           <button onClick={handleSubmitQuiz}>Submit Quiz</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;






// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import mockTestData from "./mockTestData"; // Import the mock data

// const Quiz = () => {
//   const { testId } = useParams();
//   const [test, setTest] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulate fetching the test data from mockTestData.js
//     setTest(mockTestData);
//   }, [testId]);

//   const handleAnswerSelect = (option) => {
//     setSelectedAnswer(option);
//   };

//   const handleNextQuestion = () => {
//     if (selectedAnswer) {
//       setUserAnswers((prev) => [
//         ...prev,
//         {
//           questionId: test.tests[0].questions[currentQuestionIndex].question_id,
//           answer: selectedAnswer,
//         },
//       ]);
//     }
//     setSelectedAnswer(null);
//     if (currentQuestionIndex < test.tests[0].questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       navigate("/quiz-result", { state: { userAnswers: [...userAnswers, { questionId: test.tests[0].questions[currentQuestionIndex].question_id, answer: selectedAnswer }] } });
//     }
//   };

//   const handleSubmitQuiz = () => {
//     if (selectedAnswer) {
//       setUserAnswers((prev) => [
//         ...prev,
//         {
//           questionId: test.tests[0].questions[currentQuestionIndex].question_id,
//           answer: selectedAnswer,
//         },
//       ]);
//     }
//     console.log("Final answers", userAnswers);
//     navigate("/quiz-result", { state: { userAnswers } });
//   };

//   if (!test) return <p>Loading quiz...</p>;

//   const question = test.tests[0].questions[currentQuestionIndex];

//   return (
//     <div>
//       <h2>{test.tests[0].name}</h2>
//       <p>{question.question}</p>
//       <div>
//         {Object.keys(question.options).map((key) => (
//           <button
//             key={key}
//             onClick={() => handleAnswerSelect(key)}
//             style={{
//               backgroundColor: selectedAnswer === key ? "lightblue" : "white",
//             }}
//           >
//             {question.options[key]}
//           </button>
//         ))}
//       </div>
//       <div>
//         {currentQuestionIndex < test.tests[0].questions.length - 1 ? (
//           <button onClick={handleNextQuestion}>Next</button>
//         ) : (
//           <button onClick={handleSubmitQuiz}>Submit Quiz</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;













import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockTestData from "./mockTestData"; // Import the mock data

const Quiz = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching the test data from mockTestData.js
    setTest(mockTestData);
  }, [testId]);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setUserAnswers((prev) => [
        ...prev,
        {
          questionId: test.tests[0].questions[currentQuestionIndex].question_id,
          answer: selectedAnswer,
        },
      ]);
    }
    setSelectedAnswer(null);
    if (currentQuestionIndex < test.tests[0].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/quiz-result", { state: { userAnswers: [...userAnswers, { questionId: test.tests[0].questions[currentQuestionIndex].question_id, answer: selectedAnswer }] } });
    }
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer) {
      setUserAnswers((prev) => [
        ...prev,
        {
          questionId: test.tests[0].questions[currentQuestionIndex].question_id,
          answer: selectedAnswer,
        },
      ]);
    }
    navigate("/quiz-result", { state: { userAnswers } });
  };

  if (!test) return <p>Loading quiz...</p>;

  const question = test.tests[0].questions[currentQuestionIndex];

  return (
    <div>
      <h2>{test.tests[0].name}</h2>
      <ol> {/* Use ordered list to display question number */}
        <li>
          <p>{question.question}</p>
          <div>
            {Object.keys(question.options).map((key) => (
              <button
                key={key}
                onClick={() => handleAnswerSelect(key)}
                style={{
                  backgroundColor: selectedAnswer === key ? "lightblue" : "white",
                }}
              >
                {key}. {question.options[key]}
              </button>
            ))}
          </div>
        </li>
      </ol>
      <div>
        {currentQuestionIndex < test.tests[0].questions.length - 1 ? (
          <button onClick={handleNextQuestion}>Next</button>
        ) : (
          <button onClick={handleSubmitQuiz}>Submit Quiz</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
