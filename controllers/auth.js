const { user: User  } = require('../models');

module.exports = {
    showRegisterPage(req, res, next) {
        res.render('auth/register');
    },

    register(req, res, next) {
        let { email, password, password_confirm } = req.body;

        if (!email || !password) return next(new Error('Необходимо ввести email и пароль'));
        else if (password !== password_confirm) return next (new Error('Пароли не совпадают'));

        User.create({ email, password })
            .then(user => {
                req.session.userId = user.id;
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

        User.authenticate(email, password)
            .then(user => {
                req.session.userId = user.id;
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