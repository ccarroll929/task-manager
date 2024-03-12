// Import Routes
const router = require('express').Router();
const apiRoutes = require('./api');
const homeroutes = require('./home-routes.js');

//Setup middleware
router.use('/api', apiRoutes);
router.use('/', homeroutes);

// Export Routes
module.exports = router;