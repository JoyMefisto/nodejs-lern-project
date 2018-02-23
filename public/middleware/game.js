const { game: Game } = require('../../shared/models');

module.exports = {
    allowGame(req, res, next) {
        Game.findOne({ game: req.game}).then(game => {
            if(game) return next();
            // res.redirect('/profile');

            next()
        }).catch(next);
    }
};