const router  = require('express').Router();
const {User}  = require('../../models');
const helpers = require('../../utils/helpers');

const googleTasks = require('../../services/GoogleTasksService');
const redis       = require('../../utils/redis');


// A GET route to get a list of tasks
router.get('/', async (req, res) => {
	      try {
		      const taskList = await googleTasks.listTasks(req.session.user.username);

		      // Respond with status 200 (successful) and send the new task list, a success message.
		      return res.status(200).json({
			                                  taskList: taskList,
			                                  message:  'List of tasks successfully obtained'
		                                  });
	      } catch (error) {
		      // Respond with status 400 (bad request) if there was an error and send the error as JSON.
		      res.status(400).json(err);
	      }
      })
      // A GET route to get a task
      .get('/:id', async (req, res) => {
	      try {
		      const taskList = await googleTasks.getTask(req.session.user.username);

		      // Respond with status 200 (successful) and send the new task list, a success message.
		      return res.status(200).json({
			                                  taskList: taskList,
			                                  message:  'List of tasks successfully obtained'
		                                  });
	      } catch (error) {
		      // Respond with status 400 (bad request) if there was an error and send the error as JSON.
		      res.status(400).json(err);
	      }
      })
	// A POST route to create a new task
	  .post('/', async (req, res) => {
		  try {
			  // Create a new task in the Google Tasks service, using data from the request body
			  const newTask = googleTasks.createTask(req.session.user.username, {
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
			  await googleTasks.deleteTask(req.session.user.username, req.params.id);

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
			  const updatedTask = await googleTasks.updateTask(req.session.user.username, req.params.id, {
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