const router = require('express').Router();
const { User } = require('../../models');

// SignUp for new user
router.post('/', async (req, res) => {
  try {
    // Check if the request body contains the required fields
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Create the user with the provided data
    const userData = await User.create(req.body);

    // Assuming userData has the password field, sanitize it before sending the response
    const sanitizedUserData = { ...userData.toJSON() };
    delete sanitizedUserData.password;

    // Save session data
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.user = sanitizedUserData;

    // Respond with success message and user data
    return res.status(200).json({
      user: sanitizedUserData,
      message: 'Signup successful',
      redirect: '/homePage'
    });
  } catch (err) {
    // Log and handle errors
    console.log(err);
    return res.status(400).json({ error: err.message || 'An error occurred' });
  }
});

module.exports = router;
