const router = require('express').Router();
const { Task, User } = require('../../models');
const withAuth = require('../../utils/auth');

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
router.post('/', withAuth, async (req, res) => {
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
router.put('/:id', withAuth, async (req, res) => {
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
router.delete('/:id', withAuth, async (req, res) => {
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

// Add a comment to a Task
router.post('/comment', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Update a comment
router.put('/comment/:id', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(updatedComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete a comment
router.delete('/comment/:id', withAuth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(deletedComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Export the router
module.exports = router;