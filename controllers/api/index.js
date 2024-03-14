// Initiate express router
const router = require('express').Router();

// Import required modules
const mainPage = require('../mainPage.js');
const editTask = require('./edit-Task.js');
const login = require('./login.js');
const newTask = require('./new-task.js');
const signup = require('./signup.js');

// Setup routes
router.use('/mainPage', mainPage);
router.use('/editTask', editTask);
router.use('/login', login);
router.use('/newTask', newTask);
router.use('/signup', signup);

// Export the router
module.exports = router;