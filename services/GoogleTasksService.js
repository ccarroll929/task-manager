const {google} = require('googleapis');

/**
 * GoogleTasksService handles operations with the Google Tasks API.
 */
class GoogleTasksService {
	cache;
	tasks;

	/**
	 * Constructor for GoogleTasksService.
	 * Authenticates with Google Tasks API and creates an API client.
	 */
	constructor(redis) {
		// Save the Redis connection.
		this.cache = redis;
		const auth = new google.auth.GoogleAuth({
			                                        keyFile: './supersecretkey.json',
			                                        scopes:  [
				                                        'https://www.googleapis.com/auth/tasks',
				                                        'https://www.googleapis.com/auth/tasks.readonly'
			                                        ]
		                                        });
		// this.tasks points to the Google Tasks API client.
		this.tasks = google.tasks({version: 'v1', auth: auth});
	}

	/**
	 * Create a task on Google Tasks.
	 *
	 * @param {string} taskListId - The ID of the task list to add the task to.
	 * @param {object} task - The task object to be created. Must comply with Google Tasks API.
	 * @throws Will throw an error if the request fails.
	 * @return {object} - The created task data.
	 */
	async createTask(taskListId, task) {
		try {
			const response = await this.tasks.tasks.insert({
				                                               tasklist: taskListId,
				                                               resource: task
			                                               });
			return response.data;
		} catch (error) {
			console.error('GoogleTasksService:createTask - Error:', error);
			throw error;
		}
	}

	/**
	 * Delete a task on Google Tasks.
	 *
	 * @param {string} taskListId - The ID of the task list the task belongs to.
	 * @param {string} taskId - The ID of the task to be deleted.
	 * @throws Will throw an error if the request fails.
	 */
	async deleteTask(taskListId, taskId) {
		try {
			await this.tasks.tasks.delete({
				                              tasklist: taskListId,
				                              task:     taskId
			                              });
		} catch (error) {
			console.error('GoogleTasksService:deleteTask - Error:', error);
			throw error;
		}
	}

	/**
	 * Retrieve all tasks from a Google Tasks list.
	 *
	 * @param {string} taskListId - The ID of the task list the tasks belong to.
	 * @throws Will throw an error if the request fails.
	 * @return {Array} - Array of task items from the specified task list.
	 */
	async getTasks(taskListId) {
		try {
			const response = await this.tasks.tasks.list({
				                                             tasklist: taskListId
			                                             });
			return response.data.items;
		} catch (error) {
			console.error('GoogleTasksService:getTasks - Error:', error);
			throw error;
		}
	}
}

// Export module
module.exports = GoogleTasksService;
