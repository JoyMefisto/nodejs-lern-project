const { player: Player } = require('../../shared/models');

module.exports = {
    findUser(req, res, next) {
        if (req.session) {
            Player.findById(req.session.playerId)
                .then(player => {
                    req.player = player;
                    res.locals.player = player;

                    next();
                })
                .catch();
        } else {
            next();
        }
    },
    allowUser(req, res, next) {
        console.log(req.player);
        if (req.player.isUser) return next();
        next('Чтобы создать команду, нужно зарегистрироваться!');
    },
    authenticated(req, res, next) {
        if (req.player) return next();

        res.status(403).redirect('/auth/login');
    },
    unauthenticated(req, res, next) {
        if (!req.player) return next();

        res.redirect('/profile');
    }
};