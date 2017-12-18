const { Router } = require('express');
const router = Router();

// GET /
router.get('/', function (req, res) {
    res.status('200');
    res.render('home');
});

module.exports = router;