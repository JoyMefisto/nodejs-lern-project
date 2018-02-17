const { Router } = require('express');
const router = Router();

// GET /
router.get('/', (req, res) => {
    console.log(req.player);
    res.render('index', { player: req.player });
});

module.exports = router;