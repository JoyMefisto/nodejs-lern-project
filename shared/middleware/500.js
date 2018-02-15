const { Router } = require('express');
const router = Router();

// Server Error
router.use((err, req, res, next) => {
    console.log(err.stack);
    res.status('500');
    res.render('500');
});

module.exports = router;