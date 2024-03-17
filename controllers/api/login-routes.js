const router = require('express').Router();
const {User} = require('../../models');

// Login for existing user
router.post('/', async (req, res) => {
	console.log('Checking', req.body);
	try {
		const userData = await User.findOne({where: {email: req.body.username}});
		if (!userData) {
			console.log('User not found');
			res.status(400).json({message: 'Incorrect email or password, please try again'});
			return;
		}
		const validPassword = await userData.checkPassword(req.body.password);
		if (!validPassword) {
			console.log('Bad password');
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