const {QuestionSet, UserTestRecord, Test} = require("../models/Structure");

// Start Test API
exports.startTest = async (req, res) => {
  try {
    const { testId } = req.body;
    const test = await Test.findById(testId).populate("questionSets.setId");

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    // Extract questions from the question sets
    let questions = [];
    test.questionSets.forEach((set) => {
      const selectedQuestions = set.setId.questions.slice(0, set.numToPick);
      questions = questions.concat(selectedQuestions);
    });

    res.status(200).json({
      testName: test.name,
      description: test.description,
      questions,
    });
  } catch (error) {
    console.error("Error starting test:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Submit Test API
exports.submitTest = async (req, res) => {
  try {
    const { testId, userId, answers } = req.body; // Ensure `userId` is included

    if (!testId || !userId || !answers) {
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
        const selectedOption = answers[question._id]; // Fix this line

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

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = score >= test.passingScore;

    const userTestRecord = await UserTestRecord.findOneAndUpdate(
      { userId, testId },
      {
        $push: {
          attempts: {
            questionsAttempted: attemptedQuestions,
            score,
            timestamp: new Date(),
          },
        },
        $set: { lastAttempted: new Date() },
        $max: { bestScore: score },
      },
      { upsert: true, new: true }
    );

    res.json({
      message: "Test submitted successfully",
      score,
      passed,
      totalQuestions,
      correctAnswers,
      userTestRecord,
    });
  } catch (error) {
    console.error("Error submitting test:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

