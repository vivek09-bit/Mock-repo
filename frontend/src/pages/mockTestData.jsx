
const mockTestData = {
  tests: [
    {
      test_id: "1",
      name: "Sample Quiz",
      questions: [
        {
          question_id: "1",
          question: "What is the capital of France?",
          options: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Rome",
          },
          correct_answer: "c", // Correct answer is "Paris"
        },
        {
          question_id: "2",
          question: "What is 2 + 2?",
          options: {
            a: "3",
            b: "4",
            c: "5",
            d: "6",
          },
          correct_answer: "b", // Correct answer is "4"
        },
        {
          question_id: "3",
          question: "What is 2 * 4 ?",
          options: {
            a: "8",
            b: "4",
            c: "5",
            d: "6",
          },
          correct_answer: "a", // Correct answer is "8"
        },
        {
          question_id: "4",
          question: "What is 4 + 2?",
          options: {
            a: "3",
            b: "4",
            c: "5",
            d: "6",
          },
          correct_answer: "d", // Correct answer is "6"
        },
      ],
    },
  ],
};

export default mockTestData;
