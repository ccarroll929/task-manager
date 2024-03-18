// Initiate express router
const router = require('express').Router();

// Import required modules
const userRoutes = require('./user-routes.js');
const taskRoutes = require('./task-routes.js');

// Setup routes
router.use('/user-routes', userRoutes);
router.use('/task-routes', taskRoutes);

// Export the router
module.exports = router;