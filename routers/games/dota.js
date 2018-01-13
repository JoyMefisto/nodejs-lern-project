const { Router } = require('express');
const router = Router();
const dota =

// GET /dota
router.get('/', (req, res) => {
    res.render('games/dota');
});

module.exports = router;