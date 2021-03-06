const { Router } = require('express');
const router = Router();

// GET /404
router.use((req, res, next) => {
    res.status('404');
    res.render('404');
});

module.exports = router;