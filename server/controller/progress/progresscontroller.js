const Progress = require('../../models/progress');

exports.getProgress = async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) {
      return res.status(400).json({ message: 'Email required' });
    }

    const progress = await Progress.findOne({ email });

    if (!progress) {
      return res.json({
        email,
        completedLessons: [],
        scores: {},
        currentStreak: 0,
        longestStreak: 0,
        dailyGoal: 1,
      });
    }

    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};