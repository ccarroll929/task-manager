const router = require('express').Router();
const { User, Task } = require('../../models');

// Create new task
router.post('/', async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newTask);
        res.redirect('/mainPage.js'); // redirect to mainPage.js
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;