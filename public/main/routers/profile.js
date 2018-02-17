const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('profile/profile', {
        player: req.player
    })
});

module.exports = router;