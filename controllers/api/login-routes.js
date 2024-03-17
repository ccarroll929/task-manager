const router = require('express').Router();
const { User } = require('../../models');

// Login for existing user
router.post('/', async (req, res) => {
  console.log('Checking',req.body);
  try {
    const userData = await User.findOne({ where: { email: req.body.username } });
    if (!userData) {
      console.log('User not found');
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      console.log('Bad password');
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Redirect to homepage after login
router.get('/', async (req, res) => {
  try {
    res.redirect('/homepage');
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;