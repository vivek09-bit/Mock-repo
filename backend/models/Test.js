const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  testId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  subcategory: { type: String, required: true },
  section: { type: String, required: true },
  questions: [
    {
      questionId: { type: String, required: true },
      question: { type: String, required: true },
      options: { type: [String], required: true },
      correctOption: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Test", testSchema);