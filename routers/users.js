const { Router } = require('express');
const router = Router();
const users = require('../controllers/users');

// GET /users
router.get('/', users.renderUsers);

// GET /users/1
router.get('/:id', users.renderUser);

module.exports = router;