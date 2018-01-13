const { Router } = require('express');
const router = Router();

// GET /dota
router.get('/', (req, res) => {
    res.render('games/overwatch');
});

module.exports = router;