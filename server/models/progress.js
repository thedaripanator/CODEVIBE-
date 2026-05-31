// models/Progress.js
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  
  
  currentStreak: {
    type: Number,
    default: 0,
  },

  longestStreak: {
    type: Number,
    default: 0,
  },

  lastActiveDate: {
    type: Date,
    default: null,
  },

  dailyGoal: {
    type: Number,
    default: 1,
  }, 
  
  completedLessons: { type: [String], default: [] },
  scores: { type: Map, of: Number, default: {} },
 username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  college: { type: String, required: true },
  year: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  
});

module.exports = mongoose.models.Progress || mongoose.model('Progress', progressSchema);
