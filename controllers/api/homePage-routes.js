const router = require('express').Router();
const { User, Task } = require('../../models');

// GET all tasks for homepage
router.get('/', async (req, res) => {
  try {
    const taskData = await Task.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
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