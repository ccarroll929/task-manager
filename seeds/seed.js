// Required libraries
const fs        = require('fs').promises;
const sequelize = require('../config/connection');
const User      = require('../models/User');

// File paths
const paths = {
	userData: './seeds/UserData.json'
};

// Seeds data into the database
(async () => {
	try {
		// Sync database
		await sequelize.sync({force: true});
		console.log('\n----- DATABASE SYNCED -----\n');

		// Seed user data
		const userData = JSON.parse(await fs.readFile(paths.userData, 'utf8'));
		await User.bulkCreate(userData, {individualHooks: true});
		console.log('\n----- USERS SEEDED -----\n');

		// Close the database connection
		await sequelize.close();
		console.log('\n----- DATABASE CONNECTION CLOSED -----\n');
	} catch (error) {
		console.log('\n----- ERROR SEEDING -----\n');
		console.log(error);
	} finally {
		process.exit();
	}
})();
