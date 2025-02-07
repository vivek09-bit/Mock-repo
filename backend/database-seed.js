const mongoose = require("mongoose");
const { Test, QuestionSet } = require("./models/Structure");
require("dotenv").config();
const connectDB = require("./config/db");

const seedTests = async () => {
  await connectDB();

  try {
    // Create a sample question set
    const questionSet = new QuestionSet({
      name: "General Knowledge",
      subject: "GK",
      subcategory: "World",
      questions: [
        {
          questionText: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          correctAnswer: 2,
          difficulty: "easy",
          tags: ["geography"],
        },
        {
          questionText: "Who wrote 'Hamlet'?",
          options: ["Shakespeare", "Tolstoy", "Hemingway", "Orwell"],
          correctAnswer: 0,
          difficulty: "medium",
          tags: ["literature"],
        },
      ],
      totalQuestions: 2,
    });

    await questionSet.save();

    // Create a sample test
    const test = new Test({
      name: "GK Quiz",
      description: "A simple general knowledge test.",
      questionSets: [{ setId: questionSet._id, numToPick: 2 }],
      passingScore: 1,
    });

    await test.save();
    console.log("Test data seeded!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
};

seedTests();
