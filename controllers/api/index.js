// Initiate express router
const router = require('express').Router();

// Import required modules
const allTasks = require('./allTasks');
const singleTask = require('./singleTask');

// Setup routes
router.use('/allTasks', allTasks);
router.use('/singleTask', singleTask);

// Export the router
module.exports = router;