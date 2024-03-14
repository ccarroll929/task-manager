// Initiate express router
const router = require('express').Router();

// Import required modules
const mainPage = require('../mainPage'); // Goes back to mainPage.js in the controllers folder
const editTask = require('./editTask-routes');
const homepage = require('./homePage-routes');
const login = require('./login-routes');
const newTask = require('./newTask-routes');
const signup = require('./signup-routes');

// Setup routes
router.use('../mainPage', mainPage);
router.use('./editTask', editTask);
router.use('./homepage', homepage);
router.use('./login', login);
router.use('./newTask', newTask);
router.use('./signup', signup);

// Export the router
module.exports = router;