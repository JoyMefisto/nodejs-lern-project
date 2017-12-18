const usersList = require('../data/users');

module.exports = {
    renderUsers(req, res) {
        res.status('200');
        res.render('users', {users: () => usersList.map(u => u.title)});
    },

    renderUser(req, res) {
        let user = usersList.find(user => user.id == req.params.id);

        res.status('200');
        res.render('user', {user: user.title});
    }
}