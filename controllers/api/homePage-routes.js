// Create routes for the Page1 API
const router = require('express').Router();
const { Task, User } = require('../../models');
// const withAuth = require('../../utils/helper');

//  GET all Tasks for homepage
router.get('/', async (req, res) => {
    try {
        const dbTasksData = await Task.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const tasks = dbTasksData.map((task) => task.get({ plain: true }));

        res.status(200).json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET singleTask page
router.get('/:id', async (req, res) => {
    try {
        const dbTasksData = await Task.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const task = dbTasksData.get({ plain: true });

        res.status(200).json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create a new Task
router.post('/', async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newTask);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Update a Task
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(updatedTask);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete a Task
router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(deletedTask);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;