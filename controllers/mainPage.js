// Handles all routes for the homepage 
const router = require('express').Router();
// const { User } = require('../models'); PRETTY SURE WE DON'T NEED THIS, AS THIS FILE JUST HANDLES ROUTES FROM THE LANDING PAGE 
// const helpers = require('../utils/helpers'); // PRETTY SURE WE DON'T NEED THIS, AS THIS FILE JUST HANDLES ROUTES FROM THE LANDING PAGE

// Route to get mainPage
router.get('/', async (req, res) => {
  try {
    res.render('mainPage');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Homepage once logged in
router.get('/homepage', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('login');
});


// Signup
router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// router.get('/newTask', async (req, res) => {
//   try {
//     res.render('newTask');
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// router.get('/editTask', async (req, res) => {
//   try {
//     res.render('editTask');
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



module.exports = router;