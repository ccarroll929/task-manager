const {google} = require('googleapis');

class GoogleTasksService {
	cache;

	constructor(redis) {
		// Save the Redis connection.
		this.cache   = redis;
		// Authenticate with Google to use the YouTube API
		const auth   = new google.auth.GoogleAuth({
			                                          keyFile: './think-415219-cf4578725c4b.json',
			                                          scopes:  ['https://www.googleapis.com/auth/tasks','https://www.googleapis.com/auth/tasks.readonly']
		                                          });
		this.youtube = google.tasks({version: 'v3', auth: auth});
	}

	async createTask(user, taskDetails) {}

	async deleteTask(user, taskId) {}

	async getTasks() {

	}
}