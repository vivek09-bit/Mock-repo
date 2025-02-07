
// Sample mock data (ideally, you would use a database here)
const mockTests = [{
  "tests": [
    {
      "testId": "1",
      "name": "JSON Basics Test",
      "subject": "JSON",
      "subcategory": "Basics",
      "section": "01",
      "questionSets": [
        {
          "questions": [
            {
              "questionId": 1,
              "question": "JSON stands for _______.",
              "options": [
                { "text": "JavaScript Object Notation", "correct": true },
                { "text": "Java Object Notation", "correct": false },
                { "text": "JavaScript Object Normalization", "correct": false },
                { "text": "JavaScript Object-Oriented Notation", "correct": false }
              ]
            },
            {
              "questionId": 3,
              "question": "Which data type is NOT supported by JSON?",
              "options": [
                { "text": "String", "correct": false },
                { "text": "Object", "correct": false },
                { "text": "Function", "correct": true },
                { "text": "Array", "correct": false }
              ]
            }
          ]
        }
      ]
    },
    {
      "testId": "2",
      "name": "JavaScript Basics Test",
      "subject": "JavaScript",
      "subcategory": "Basics",
      "section": "01",
      "questionSets": [
        {
          "questions": [
            {
              "questionId": 1,
              "question": "Which method can be used to add an item to the end of an array in JavaScript?",
              "options": [
                { "text": "push()", "correct": true },
                { "text": "pop()", "correct": false },
                { "text": "shift()", "correct": false },
                { "text": "unshift()", "correct": false }
              ]
            },
            {
              "questionId": 2,
              "question": "What does 'var' mean in JavaScript?",
              "options": [
                { "text": "Variable", "correct": true },
                { "text": "Value", "correct": false },
                { "text": "Validation", "correct": false },
                { "text": "Visual", "correct": false }
              ]
            }
          ]
        }
      ]
    },
    {
      "testId": "3",
      "name": "Algorithms Basics Test",
      "subject": "Algorithms",
      "subcategory": "Basics",
      "section": "01",
      "questionSets": [
        {
          "questions": [
            {
              "questionId": 1,
              "question": "Which algorithm is used to find the shortest path in a graph?",
              "options": [
                { "text": "Dijkstra's Algorithm", "correct": true },
                { "text": "Merge Sort", "correct": false },
                { "text": "Bubble Sort", "correct": false },
                { "text": "Breadth-First Search", "correct": false }
              ]
            }
          ]
        }
      ]
    }
  ]
}
]
 

// Controller to fetch test by testId
const getTest = (req, res) => {
  const { testId } = req.params;
  const test = mockTests.find(t => t.testId === testId);
  
  if (!test) {
    return res.status(404).json({ message: 'Test not found' });
  }

  res.status(200).json(test);
};

// Controller to add new question to a test
const addQuestionToTest = (req, res) => {
  const { testId } = req.params;
  const { question, options } = req.body;

  const test = mockTests.find(t => t.testId === testId);
  
  if (!test) {
    return res.status(404).json({ message: 'Test not found' });
  }

  const newQuestion = {
    question,
    options
  };

  test.test.questionSets[0].questions.push(newQuestion); // Add to first question set (can adjust if multiple sets)
  
  res.status(201).json({ message: 'Question added successfully', test });
};

module.exports = { getTest, addQuestionToTest };








