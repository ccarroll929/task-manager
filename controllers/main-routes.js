// Handles all routes for the homepage 
const router = require('express').Router();
const { User, Task } = require('../models'); // MAY NEED TO ADD MORE LATER

// GET all Tasks for homepage
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

        res.render('homepage', {
            tasks,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET singleTask page
router.get('/singleTask/:id', async (req, res) => {
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

    res.render('singleTask', {
            task,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET editTask page
router.get('/editTask/:id', async (req, res) => {
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

    res.render('editTask', {
        task,
        loggedIn: req.session.loggedIn,
    });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// GET signup page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// GET dashboard page
router.get('/dashboard', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    res.render('dashboard');
});

// GET newpost page
router.get('/newpost', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    res.render('newpost');
});

// GET editpost page
router.get('/editpost/:id', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    res.render('editpost', { postId: req.params.id });
});

module.exports = router;
