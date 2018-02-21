const { player: Player  } = require('../../../shared/models');
const { ObjectID } = require('mongodb');

module.exports = {
    showRegisterPage(req, res, next) {
        res.render('auth/register');
    },

    register(req, res, next) {
        let { email, password, password_confirm, role, name, game, teams } = req.body;

        if (!email || !password) return next(new Error('Необходимо ввести email и пароль'));
        else if (password !== password_confirm) return next (new Error('Пароли не совпадают'));

        Player.create({
            _id: ObjectID(Date.now()),
            name,
            game: game,
            teams: teams,
            email,
            password,
            role,
        })
            .then(player => {
                console.log(player);
                req.session.playerId = player.id;
                res.redirect('/profile');
            })
            .catch(next);
    },

    showLoginPage(req, res, next) {
        res.render('auth/login');
    },

    login(req, res, next) {
        let { email, password } = req.body;

        if (!email || !password) {
            let error = new Error('Необходимо ввести логин и пароль');
            error.status = 401;
            return next(error);
        }

        Player.authenticate(email, password)
            .then(player => {
                req.session.playerId = player.id;
                res.redirect('/profile');
            })
            .catch(next);
    },

    logout(req, res, next) {
        if (req.session) {
            req.session.destroy(error => {
                if (error) return next(error);

                res.redirect('/');
            });
        }
    }
};