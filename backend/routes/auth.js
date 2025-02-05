const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { User, Test } = require("../models/Structure");
const verifyToken = require("../middleware/verifyToken");
const { v4: uuidv4 } = require("uuid");




const router = express.Router();

// Helper function to handle errors
const handleError = (res, statusCode, message, error = null) => {
  if (error) console.error(error);
  return res.status(statusCode).json({ success: false, message });
};


// =========================== REGISTER ===========================

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password, phone } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique userID and profileURL
    const userID = uuidv4();
    const profileURL = `https://localhost.in/profile/${username}`;

    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      phone,
      userID, //Line 44
      profileURL,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", profileURL });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


// =========================== LOGIN ===========================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
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
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// =========================== PROFILE ===========================
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return handleError(res, 404, "User not found");
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    handleError(res, 500, "Server error", error);
  }
});


//============================Profile/ID===========================
router.get("/profile/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Find user by username (exclude password)
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// =========================== MOCK TEST ===========================
router.get("/mocktest/:testId", async (req, res) => {
  const { testId } = req.params;

  try {
    const test = await Test.findOne({ _id: testId });
    if (!test) {
      return res.status(404).json({ success: false, message: "Test not found" });
    }

    res.status(200).json({ success: true, test });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
