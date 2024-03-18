const router = require('express').Router();
const { User, Task } = require('../../models');
const helpers = require('../../utils/helpers');
const redis = require('redis');
const client = redis.createClient();

// GET all tasks for homepage
router.get('/', async (req, res) => {
    try {
      const taskData = await Task.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const tasks = taskData.map((task) => task.get({ plain: true }));
  
      res.render('homepage', {
        tasks,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create new task
router.post('/', async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        // Send the new task to Google Tasks API
        const googleTasksUrl = 'https://www.googleapis.com/tasks/v1/lists/{YOUR_TASK_LIST_ID}/tasks';
        const googleTasksPayload = {
            title: newTask.title,
            notes: newTask.description,
            status: newTask.status
        };

        await axios.post(googleTasksUrl, googleTasksPayload);

        res.status(200).json(newTask);
        res.redirect('/homePage'); // redirect to mainPage.js
    } catch (err) {
        res.status(400).json(err);
    }
});

// Send the new task to Google Tasks API using Redis
client.on('connect', async () => {
    const googleTasksUrl = 'https://www.googleapis.com/tasks/v1/lists/{YOUR_TASK_LIST_ID}/tasks';
    const googleTasksPayload = {
        title: newTask.title,
        notes: newTask.description,
        status: newTask.status
    };

    client.rpush('tasks', JSON.stringify(googleTasksPayload), (err, reply) => {
        if (err) {
            console.error('Error sending task to Redis:', err);
        } else {
            console.log('Task sent to Redis:', reply);
        }
    });
});

// GET single task that is being edited
router.get('/:id', async (req, res) => {
    try {
      const taskData = await Task.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const task = taskData.get({ plain: true });
  
      res.render('editTask', {
        ...task,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});
  
  // PUT update a single selected task
  router.put('/:id', async (req, res) => {
    try {
      const taskData = await Task.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
  
      if (!taskData) {
        res.status(404).json({ message: 'No task found with this id!' });
        return;
      }
  
      res.status(200).json(taskData);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
  // DELETE a single selected task
  router.delete('/:id', async (req, res) => {
    try {
      const taskData = await Task.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!taskData) {
        res.status(404).json({ message: 'No task found with this id!' });
        return;
      }
  
      res.status(200).json(taskData);
      res.redirect('/mainPage.js'); // redirect to mainPage.js
    } catch (err) {
      res.status(500).json(err);
    }
});

// REDUNDANT CODE??? vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Redirect to editTask
router.get('/editTask', async (req, res) => {
    try {
      res.render('editTask', {
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Redirect to newTask
router.get('/newTask', async (req, res) => {
    try {
      res.render('newTask', {
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;