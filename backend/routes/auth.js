const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { User, Test } = require("../models/Structure");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Helper function to handle errors
const handleError = (res, statusCode, message, error = null) => {
  if (error) console.error(error);
  return res.status(statusCode).json({ success: false, message });
};

// =========================== REGISTER ===========================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    user = new User({ name, email, password: hashedPassword, phone });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// =========================== LOGIN ===========================
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleError(res, 400, errors.array()[0].msg);
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return handleError(res, 404, "User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return handleError(res, 400, "Invalid credentials");
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.userType,
        },
      });
    } catch (error) {
      handleError(res, 500, "Server error", error);
    }
  }
);

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
