const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  correct: { type: Boolean, required: true }
});

const QuestionSchema = new mongoose.Schema({
  questionId: { type: Number, required: true },
  question: { type: String, required: true },
  options: [OptionSchema]
});

const QuestionSetSchema = new mongoose.Schema({
  questions: [QuestionSchema]
});

const TestSchema = new mongoose.Schema({
  testId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  subject: { type: String, required: true },
  subcategory: { type: String, required: true },
  section: { type: String, required: true },
  questionSets: [QuestionSetSchema]
});

const Test = mongoose.model('Test', TestSchema);

module.exports = Test;
