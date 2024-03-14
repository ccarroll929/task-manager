// Initiate express router
const router = require('express').Router();

// Import required modules
const mainPage = require('../mainPage');
const editTask = require('./edit-Task');
const login = require('./login');
const newTask = require('./new-task');
const signup = require('./signup');


// Setup routes
router.use('../mainPage', mainPage);
router.use('./editTask', editTask);
router.use('./login', login);
router.use('./newTask', newTask);
router.use('./signup', signup);

// Export the router
module.exports = router;