const router = require('express').Router();

// Redirects user to login page
router.get('mainPage', async (req, res) => {
  try {
    res.redirect('/login');
  } catch (err) {
    res.status(400).json(err);
  }
});

// Redirects user to signup page
router.get('mainPage', async (req, res) => {
  try {
    res.redirect('/signup');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router; 