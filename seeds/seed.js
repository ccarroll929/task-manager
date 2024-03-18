// Required libraries
const fs                 = require('fs').promises;
const sequelize          = require('../config/connection');
const User               = require('../models/User');

const RedisCache         = require('redis');
const GoogleTasksService = require('../services/GoogleTasksService');
const redis              = null; //new RedisCache();
const googleTasks        = new GoogleTasksService(redis);

//
// File paths
const paths = {
	userData: './seeds/UserData.json',
	taskData: './seeds/TaskData.json'
};

// Seeds data into the database
(async () => {
	try {
		// Sync database
		await sequelize.sync({force: true});
		await googleTasks.deleteAllTaskLists();
		console.log('\n----- DATABASE SYNCED -----\n');

		// Seed user data
		const userData = JSON.parse(await fs.readFile(paths.userData, 'utf8'));
		await User.bulkCreate(userData, {individualHooks: true});
		// Seed Google Tasks
		const taskIds = [];
		for (let user of Object.values(userData)) {
			const response = await googleTasks.createTaskList(user.username);
			taskIds.push(response);
		}
		console.log('\n----- USERS SEEDED -----\n');

		// Seed user data
		const taskData = JSON.parse(await fs.readFile(paths.taskData, 'utf8'));
		for (let task of Object.values(taskData)) {
			const taskId = taskIds[task.user_id]?.id;
			if (taskId) {
				const response = await googleTasks.createTask(taskId, {
					title: task.title,
					notes: task.notes
				});

				console.log(response);
			}
		}

		console.log('\n----- DATA SEEDED -----\n');

		// Close the database connection
		await sequelize.close();
		console.log('\n----- DATABASE CONNECTION CLOSED -----\n');

		// Listing Task Lists
		const taskLists = await googleTasks.listTaskLists(userData.username);
	} catch (error) {
		console.log('\n----- ERROR SEEDING -----\n');
		console.log(error);
	} finally {
		process.exit();
	}
})();
