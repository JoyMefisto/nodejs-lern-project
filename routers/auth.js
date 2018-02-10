const { Router } = require('express');
const router = Router();
const auth = require('../controllers/auth');

router.route('/register')
    .get(auth.showRegisterPage)
    .post(auth.register);

router.route('/login')
    .get(auth.showLoginPage)
    .post(auth.login);

// GET /auth/
router.get('/logout', auth.logout);

module.exports = router;