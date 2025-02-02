const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  userType: {
    type: String,
    required: true,
    enum: ['student', 'instructor'], // Only allow these roles
  },
  gradeLevel: {
    type: String,
    required: false,
  },
  subjects: {
    type: [String], // Array of subjects
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  preferredLanguage: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  termsAccepted: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);