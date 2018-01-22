const { Router } = require('express');
const router = Router();

// GET /dota
router.get('/', (req, res) => {
    res.render('games/dota');
});

module.exports = router;