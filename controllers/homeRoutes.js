const router = require('express').Router();
const { User, Post, Tiles, Comment } = require('../models');

// Handles all routes for the homepage 

// Import Models


// GET all Tiles for homepage
router.get('/', async (req, res) => {
    try {
        const dbTilesData = await Tiles.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const tiles = dbTilesData.map((tile) => tile.get({ plain: true }));

        res.render('homepage', {
            tiles,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET singleTile page
router.get('/singleTile/:id', async (req, res) => {
    try {
    const dbTilesData = await Tiles.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    });

    const tile = dbTilesData.get({ plain: true });

    res.render('singleTile', {
            tile,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET editTile page
router.get('/editTile/:id', async (req, res) => {
    try {
        const dbTilesData = await Tiles.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    });

    const tile = dbTilesData.get({ plain: true });

    res.render('editTile', {
        tile,
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