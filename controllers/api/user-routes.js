// Import the router and the User model
const router = require('express').Router();
const { User } = require('../../models');

// Route to get all users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({ attributes: { exclude: ['password'] } })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    }
);

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

// Login for existing user
router.post('/', async (req, res) => {
	console.log('Checking', req.body);
	try {
		const userData = await User.findOne({where: {username: req.body.username}});
		if (!userData) {
			res.status(400).json({message: 'Incorrect email or password, please try again'});
			return;
		}
		const validPassword = await userData.checkPassword(req.body.password);
		if (!validPassword) {
			res.status(400).json({message: 'Incorrect email or password, please try again'});
			return;
		}

		req.session.save(() => {
			req.session.user_id   = userData.id;
			req.session.logged_in = true;

			// Save the user data in the session, and sanitize the password for sending the user data to the browser.
			req.session.user = userData;
			delete userData.dataValues.password;
			// Upon successful login, inform the user they've been successfully logged in, and forward them to the
			// homepage.
			return res.status(200).json({
				                            userData: userData,
				                            message:  'Login successful',
				                            redirect: '/homepage'
			                            });
		});
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

module.exports = router;