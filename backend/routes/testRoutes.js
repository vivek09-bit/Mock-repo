
const express = require('express');
const { getTest, addQuestionToTest } = require('../controllers/testController');
const router = express.Router();

// Get test by testId
router.get('/:testId', getTest);

// Add a new question to a test
router.post('/:testId/addQuestion', addQuestionToTest); // New route to add questions

module.exports = router;
