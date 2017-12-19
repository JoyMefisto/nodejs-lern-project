const { Router } = require('express');
const router = Router();

const fortunes = require('../data/fortunes');

// GET /about
router.get('/', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.status('200');
    res.render('about', { fortune: randomFortune});
});

module.exports = router;