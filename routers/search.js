const { Router } = require('express');
const router = Router();

// GET /search
router.get('/', (req, res) => {
    res.status('200');
    res.render('search');
});

module.exports = router;