// Initiate express router
const router = require('express').Router();

// Import required modules
const page1 = require('./Page1');
const page2 = require('./Page2');

// Setup routes
router.use('/page1', page1);
router.use('/page2', page2);

// Export the router
module.exports = router;