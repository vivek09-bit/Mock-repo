const express = require("express");
const router = express.Router();
const { Test } = require("../models/Structure");
const authMiddleware = require("../middleware/authMiddleware");


// Get all available tests
// Get all available tests
router.get("/", async (req, res) => {
    try {

      console.log("Test model:", Test);
      const tests = await Test.find();
      console.log(tests);
      
      res.json(tests);
  
    } catch (error) {
      console.error("Error fetching tests:", error); // 👈 Log the exact error
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

// Get test details by ID
router.get("/:testId", async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId).populate("questionSets.setId");
    if (!test) return res.status(404).json({ message: "Test not found" });

    const questions = test.questionSets.flatMap(set => set.setId.questions.slice(0, set.numToPick));
    
    res.json({
      name: test.name,
      description: test.description,
      questions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { testId, answers } = req.body;
    const userId = req.user.id; 

    if (!testId || !answers) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const test = await Test.findById(testId).populate("questionSets.setId");
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    let totalQuestions = 0;
    let correctAnswers = 0;
    let attemptedQuestions = [];

    for (const set of test.questionSets) {
      if (!set.setId) continue;

      totalQuestions += set.numToPick;
      const selectedQuestions = set.setId.questions.slice(0, set.numToPick);

      selectedQuestions.forEach((question) => {
        const selectedOption = answers[question._id];

        if (selectedOption !== undefined) {
          const isCorrect = selectedOption === question.correctAnswer;
          if (isCorrect) correctAnswers++;

          attemptedQuestions.push({
            questionId: question._id,
            questionText: question.questionText,
            selectedOption,
            isCorrect,
          });
        }
      });
    }

    const score = (correctAnswers / totalQuestions) * 100;

    // ✅ Ensure UserTestRecord is properly used
    const userTestRecord = new UserTestRecord({
      userId,
      testId,
      testDetails: {
        testName: test.name,
        totalQuestions,
        passingScore: test.passingScore
      },
      attempts: [{
        questionsAttempted: attemptedQuestions,
        score,
        timestamp: new Date()
      }],
      bestScore: Math.max(score, 0),
      lastAttempted: new Date()
    });

    await userTestRecord.save();

    res.status(200).json({ message: "Test submitted successfully", score });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});





module.exports = router;
