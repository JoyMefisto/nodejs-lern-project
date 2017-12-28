const usersList = require('../data/users');

module.exports = {
    renderUsers(req, res) {
        let list = usersList.map(u => u.title);
        res.render('users', { users: list });
    },

    renderUser(req, res) {
        let user = usersList.find(user => user.id == req.params.id);
        res.render('user', {user: user.title});
    }
}