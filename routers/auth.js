const { Router } = require('express');
const router = Router();
const auth = require('../controllers/auth');
const { auth: { unauthenticated, authenticated } } = require('../middleware');

router.route('/register')
    .all(unauthenticated)
    .get(auth.showRegisterPage)
    .post(auth.register);

router.route('/login')
    .all(unauthenticated)
    .get(auth.showLoginPage)
    .post(auth.login);

router.get('/logout', authenticated, auth.logout);

module.exports = router;