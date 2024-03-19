const router     = require('express').Router();
const RedisCache = require('../../utils/redis'); // Import the redis module
const redis      = new RedisCache();

// Import the GoogleTasksService instance from the GoogleTasksService.js file
const GoogleTasksService = require('../../services/GoogleTasksService');
const googleTasks        = new GoogleTasksService(redis);

// A GET route to get a list of tasks
router.get('/', async (req, res) => {
	      try {
		      const taskList = await googleTasks.listTasks(req.session.user.list_id);
			  console.log(taskList);

		      // Respond with status 200 (successful) and send the new task list, a success message.
		      return res.status(200).json({
			                                  taskList: taskList,
			                                  message:  'List of tasks successfully obtained'
		                                  });
	      } catch (error) {
		      console.log(error);
		      // Respond with status 400 (bad request) if there was an error and send the error as JSON.
		      res.status(400).json(error);
	      }
      })
	// A GET route to get a task
	  .get('/:id', async (req, res) => {
		  try {
			  const taskList = await googleTasks.getTask(req.session.user.list_id, req.params.id);

			  // Respond with status 200 (successful) and send the new task list, a success message.
			  return res.status(200).json({
				                              taskList: taskList,
				                              message:  'Task successfully obtained'
			                              });
		  } catch (error) {
			  // Respond with status 400 (bad request) if there was an error and send the error as JSON.
			  res.status(400).json(error);
		  }
	  })
	// A POST route to create a new task
	  .post('/', async (req, res) => {
		  try {
			  // Create a new task in the Google Tasks service, using data from the request body
			  const newTask = await googleTasks.createTask(req.session.user.list_id, {
				  title: req.body.title,
				  notes: req.body.description
			  });

			  // Respond with status 200 (successful) and send the new task data, a success message, and a redirect URL
			  // as JSON back to the user.
			  return res.status(200).json({
				                              newTask:  newTask,
				                              message:  'Task created successfully',
				                              redirect: '/mainPage'
			                              });
		  } catch (err) {
			  // Respond with status 400 (bad request) if there was an error and send the error as JSON.
			  res.status(400).json(err);
		  }
	  })

	// A DELETE route to delete a task
	  .delete('/:id', async (req, res) => {
		  try {
			  // Delete the task in the Google Tasks service using the ID from the request parameters
			  await googleTasks.deleteTask(req.session.list_id, req.params.id);

			  // Respond with status 200 (successful) and send a success message and a redirect URL as JSON back to the
			  // user.
			  return res.status(200).json({
				                              message:  'Task deleted successfully',
				                              redirect: '/mainPage'
			                              });
		  } catch (err) {
			  // Respond with status 400 (bad request) if there was an error and send the error as JSON.
			  res.status(400).json(err);
		  }
	  })

	// A PUT route to update a task
	  .put('/:id', async (req, res) => {
		  try {
			  // Update the task in the Google Tasks service using the ID from the request parameters and data from the
			  // request body
			  const updatedTask = await googleTasks.updateTask(req.session.list_id, req.params.id, {
				  title: req.body.title,
				  notes: req.body.description
			  });

			  // Respond with status 200 (successful) and send the updated task data, a success message, and a redirect
			  // URL as JSON back to the user.
			  return res.status(200).json({
				                              updatedTask: updatedTask,
				                              message:     'Task updated successfully',
				                              redirect:    '/mainPage'
			                              });
		  } catch (err) {
			  // Respond with status 400 (bad request) if there was an error and send the error as JSON.
			  res.status(400).json(err);
		  }
	  });

// Export the router
module.exports = router;