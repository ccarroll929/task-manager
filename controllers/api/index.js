// Initiate express router
const router = require('express').Router();

// Import required modules
const mainPage = require('./mainPage.js'); 
const editTask = require('./api/editTask-routes.js'); 
const homepage = require('./api/homepage-routes.js'); 
const login    = require('./api/login-routes.js'); 
const newTask  = require('./api/newTask-routes.js'); 
const signup   = require('./api/signup-routes.js'); 

// Setup routes
router.use('/', mainPage);
router.use('/editTask', editTask);
router.use('/homepage', homepage);
router.use('/login', login);
router.use('/newTask', newTask);
router.use('/signup', signup);

// Export the router
module.exports = router;