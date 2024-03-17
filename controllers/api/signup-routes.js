const router = require('express').Router();
const {User} = require('../../models');

// SignUp for new user
router.post('/', async (req, res) => {
	try {
		const userData = await User.create(req.body);
		req.session.save(() => {
			req.session.user_id   = userData.id;
			req.session.logged_in = true;
			// Save the user data in the session, and sanitize the password for sending the user data to the browser.
			req.session.user      = userData;
			delete userData.dataValues.password;
			// Upon successful signup, inform the user they've been successfully signed up, and forward them to the
			// homepage.
			return res.status(200).json({
				                            user:     userData,
				                            message:  'Signup successful',
				                            redirect: '/mainPage'
			                            });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;