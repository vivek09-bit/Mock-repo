const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { User, Test } = require("../models/Structure");
const verifyToken = require("../middleware/verifyToken");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =========================== REGISTER ===========================

router.post("/register", async (req, res) => {
  try {
    console.log("🔹 Incoming Request:", req.body); // ✅ Log incoming request

    const { name, username, email, password, phone } = req.body;

    // Validate required fields
    if (!name || !username || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userID = uuidv4();
    const profileURL = `https://mock-repo-backend.onrender.com/profile/${username}`;

    // Create new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      phone,
      userID,
      profileURL,
    });

    await newUser.save();
    console.log("✅ User Registered Successfully:", newUser); // ✅ Log user data

    res.status(201).json({ message: "User registered successfully", profileURL });
  } catch (error) {
    console.error("❌ Registration Error:", error.message); // ✅ Log error details
    res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
  }
});

// =========================== LOGIN ===========================

router.post("/login", async (req, res) => {
  try {
    console.log("🔹 Login Request:", req.body);

    const { emailOrUsername, password } = req.body;

    // Find user by email or username
    const user = await User.findOne({ 
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }] 
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid username/email or password" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username/email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    console.log("✅ User Logged In:", user.username);

    res.status(200).json({
      token,
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        profileURL: user.profileURL,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// =========================== GET USER PROFILE ===========================

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// =========================== GET PROFILE BY USERNAME ===========================

router.get("/profile/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error Fetching User Profile:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// =========================== MOCK TEST ROUTES ===========================

router.get("/mocktest/:testId", async (req, res) => {
  try {
    const { testId } = req.params;
    const test = await Test.findOne({ _id: testId });

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ success: true, test });
  } catch (error) {
    console.error("❌ Mock Test Fetch Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================== QUIZ QUESTIONS ===========================

router.get("/quiz/questions", async (req, res) => {
  try {
    const questions = await Test.find(); 
    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }
    res.status(200).json({ success: true, questions });
  } catch (error) {
    console.error("❌ Quiz Fetch Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// =========================== AUTHENTICATION CHECK ===========================

router.get("/me", authMiddleware, async (req, res) => {
  try {
    res.json({ message: "Authenticated user", user: req.user });
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
