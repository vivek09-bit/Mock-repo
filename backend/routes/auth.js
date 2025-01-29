const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator'); // Input validation
const verifyToken = require('../middleware/verifyToken');
const Test = require("../models/Test"); 

const router = express.Router();

// Helper function to handle errors
const handleError = (res, statusCode, message, error = null) => {
  if (error) logger.error(error); // Log the error if provided
  return res.status(statusCode).json({ success: false, message });
};

// Register
router.post(
  '/register',
  [
    // Input validation using express-validator
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage(
        'Password must include uppercase, lowercase, numbers, and special characters'
      ),
    body('termsAccepted').isBoolean().withMessage('Terms must be accepted'),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleError(res, 400, errors.array()[0].msg);
    }

    const {
      name,
      email,
      password,
      phone,
      userType,
      gradeLevel,
      subjects,
      location,
      preferredLanguage,
      profilePicture,
      termsAccepted,
    } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return handleError(res, 400, 'User already exists');
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        userType,
        gradeLevel,
        subjects,
        location,
        preferredLanguage,
        profilePicture,
        termsAccepted,
      });

      // Save the user to the database
      await user.save();

      // Respond with success
      res.status(201).json({ success: true, message: 'User created successfully. Please login.' });
    } catch (error) {
      handleError(res, 500, 'Server error', error);
    }
  }
);

// Login
router.post(
  '/login',
  [
    // Input validation
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleError(res, 400, errors.array()[0].msg);
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return handleError(res, 404, 'User not found');
      }

      // Verify the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return handleError(res, 400, 'Invalid credentials');
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Return the token and user data
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
      handleError(res, 500, 'Server error', error);
    }
  }
);

// Profile Route
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclude password
    if (!user) {
      return handleError(res, 404, 'User not found');
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    handleError(res, 500, 'Server error', error);
  }
});

router.get("/mocktest/:testId", async (req, res) => {
  const { testId } = req.params;

  try {
    const test = await Test.findOne({ testId });
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