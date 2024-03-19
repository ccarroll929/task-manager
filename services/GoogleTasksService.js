const {google}     = require('googleapis');

// Object being passed can be found here: https://developers.google.com/tasks/reference/rest/v1/tasks#Task

/**
 * GoogleTasksService handles operations with the Google Tasks API.
 */
class GoogleTasksService {
	cache;
	client;

	/**
	 * Constructor for GoogleTasksService.
	 * Authenticates with Google Tasks API and creates an API client.
	 */
	constructor(redis) {
		// Check if this class has already been instantiated. There can be only one!
		if (!GoogleTasksService.instance) {
			// Save the Redis connection.
			this.cache                  = redis;
			const auth                  = new google.auth.GoogleAuth({
				                                                         keyFile: './supersecretkey.json',
				                                                         scopes:  [
					                                                         'https://www.googleapis.com/auth/tasks'
					                                                         // 'https://www.googleapis.com/auth/tasks.readonly'
				                                                         ]
			                                                         });
			// this.client points to the Google Tasks API client.
			this.client                 = google.tasks({version: 'v1', auth: auth});
			// Save the instance
			GoogleTasksService.instance = this;
		}
		return GoogleTasksService.instance;
	}

	/**
	 * Mark a task as completed in Google Tasks
	 *
	 * @param {string} taskListId - The ID of the task list containing the task.
	 * @param {string} taskId - The ID of the task to mark as completed.
	 * @throws Will throw an error if the request fails.
	 * @return {object} - The updated task data.
	 */
	async completeTask(taskListId, taskId) {
		try {
			const response = await this.client.tasks.update({
				                                                tasklist: taskListId,
				                                                task:     taskId,
				                                                resource: {
					                                                status:      'completed',
					                                                'completed': new Date().toISOString()
				                                                }
			                                                });
			return response.data;
		} catch (error) {
			console.error('GoogleTasksService:completeTask - Error:', error);
			throw error;
		}
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
			const response = await this.client.tasks.insert({
				                                                tasklist: taskListId,
				                                                resource: task
			                                                });

			if (response.data) {
				let cache = await this.cache.get(taskListId);
				cache     = JSON.parse(cache) ?? [];
				cache.push(response.data);

				// Cache with redis
				await this.cache.set({
					                     key:    taskListId,
					                     value:  JSON.stringify(cache),
					                     expire: 600 // Expire after 10 minutes
				                     });
			}
			return response.data;
		} catch (error) {
			console.error('GoogleTasksService:createTask - Error:', error);
			throw error;
		}
	}

	/**
	 * Create a new task list in Google Tasks.
	 *
	 * @param {string} title - The title of the new task list.
	 * @throws Will throw an error if the request fails.
	 * @return {object} - The created task list data.
	 */
	async createTaskList(title) {
		try {
			const response = await this.client.tasklists.insert({
				                                                    title: title
			                                                    });
			return response.data;
		} catch (error) {
			console.error('GoogleTasksService:createTaskList - Error:', error);
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
			await this.client.tasks.delete({
				                               tasklist: taskListId,
				                               task:     taskId
			                               });
		} catch (error) {
			console.error('GoogleTasksService:deleteTask - Error:', error);
			throw error;
		}
	}

	/**
	 * Delete a task list in Google Tasks.
	 *
	 * @param {string} taskListId - The ID of the task list to delete.
	 * @throws Will throw an error if the request fails.
	 */
	async deleteTaskList(taskListId) {
		try {
			return await this.client.tasklists.delete({
				                                          tasklist: taskListId
			                                          });
		} catch (error) {
			console.error('GoogleTasksService:deleteTaskList - Error:', error);
			throw error;
		}
	}

	/**
	 * Get a specific task from a task list in Google Tasks.
	 *
	 * @param {string} taskListId - The ID of the task list containing the task.
	 * @param {string} taskId - The ID of the task to retrieve.
	 * @throws Will throw an error if the request fails.
	 * @return {object} - The task data.
	 */
	async getTask(taskListId, taskId) {
		try {
			let data = await this.cache.get(taskId);
			if (!data) {
				const response = await this.client.tasks.get({
					                                             tasklist: taskListId,
					                                             task:     taskId
				                                             });

				data = response.data;
				// Cache with redis
				await this.cache.set({
					                     key:    taskId,
					                     value:  JSON.stringify(data),
					                     expire: 600 // Expire after 10 minutes
				                     });
			} else data = JSON.parse(data);
			// Return the data
			return data;
		} catch (error) {
			console.error('GoogleTasksService:getTask - Error:', error);
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
	async listTasks(taskListId) {
		try {
			console.log(taskListId);
			let data = await this.cache.get(taskListId);
			if (!data) {
				const response = await this.client.tasks.list({
					                                              tasklist: taskListId
				                                              });

				data = response.data.items;
				// Cache with redis
				await this.cache.set({
					                     key:    taskListId,
					                     value:  JSON.stringify(data),
					                     expire: 600 // Expire after 10 minutes
				                     });
			} else data = JSON.parse(data);
			// Return the data
			return data;
		} catch (error) {
			console.error('GoogleTasksService:getTasks - Error:', error);
			throw error;
		}
	}

	/**
	 * List all task lists in Google Tasks.
	 *
	 * @throws Will throw an error if the request fails.
	 * @return {Object} - Data about all task lists.
	 */
	async listTaskLists() {
		try {
			const response = await this.client.tasklists.list();
			return response.data;
		} catch (error) {
			console.error('GoogleTasksService:listTaskLists - Error:', error);
			throw error;
		}
	}

	/**
	 * Update an existing task in Google Tasks.
	 *
	 * @param {string} taskListId - The ID of the task list containing the task to be updated.
	 * @param {string} taskId - The ID of the task to be updated.
	 * @param {object} task - The updated task object, which must comply with the Google Tasks API.
	 *               This could contain properties like {'title', 'notes', 'due', 'completed'} to be updated for the
	 *     task.
	 * @throws Will throw an error if the request fails.
	 * @return {object} - The updated task data.
	 */
	async updateTask(taskListId, taskId, task) {
		try {
			const response = await this.client.tasks.update({
				                                                tasklist: taskListId,
				                                                task:     taskId,
				                                                resource: task
			                                                });
			return response.data;
		} catch (error) {
			console.error('GoogleTasksService:updateTask - Error:', error);
			throw error;
		}
	}

	/**
	 * Update a task list title in Google Tasks.
	 *
	 * @param {string} taskListId - The ID of the task list to update.
	 * @param {string} newTitle - The new title of the task list.
	 * @throws Will throw an error if the request fails.
	 * @return {object} - The updated task list data.
	 */
	async updateTaskList(taskListId, newTitle) {
		try {
			const response = await this.client.tasklists.update({
				                                                    tasklist: taskListId,
				                                                    resource: {
					                                                    title: newTitle
				                                                    }
			                                                    });
			// Return response
			return response.data;
		} catch (error) {
			console.error('GoogleTasksService:updateTaskList - Error:', error);
			throw error;
		}
	}

	/**
	 * Deletes all task lists associated with the account.
	 * Retrieves all task lists using the `getAllTaskLists` method,
	 * then deletes each one using the `deleteTaskList` method.
	 * @async
	 * @function deleteAllTaskLists
	 * @throws {Error} When there's an error handling the request.
	 */
	async deleteAllTaskLists() {
		try {
			// Use your function to retrieve all task lists.
			const taskLists   = await this.listTaskLists();
			const taskListIds = taskLists.items.map(task => task.id).splice(1);

			for (const task of taskListIds) {
				const response = await this.deleteTaskList(task);
			}
			// For each task list, call the deleteTaskList method.
		} catch (error) {
			console.error('Error deleting all task lists:', error);
		}
	}

}

// Export module
module.exports = GoogleTasksService;
