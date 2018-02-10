const { user: User  } = require('../models');

module.exports = {
    showRegisterPage(req, res, next) {
        res.render('auth/register');
    },
    register(req, res, next) {
        let { email, password, password_confirm } = req.body;

        if (!email || !password) return next(new Error('Необходимо ввести email и пароль'));
        else if (password !== confirmPassword) return next (new Error('Пароли не совпадают'));
        console.log(email, password, password_confirm);

        User.create({ email, password })
            .then(user => {
                console.log(user);
                res.redirect('/');
            })
            .catch(next);
    },
    showLoginPage(req, res, next) {
        res.render('auth/login');
    },
    login(req, res) {

    },
    logout(req, res) {

    }
};