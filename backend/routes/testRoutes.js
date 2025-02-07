const express = require("express");
const router = express.Router();
const { Test } = require("../models/Structure");


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

module.exports = router;
