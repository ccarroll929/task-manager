// Import Routes
const express = require('express');
const router = express.Router();
const apiRoutes = require('./api/index');
const homeRoutes = require('./homeRoutes.js');

//Setup middleware
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// Export Routes
module.exports = router;