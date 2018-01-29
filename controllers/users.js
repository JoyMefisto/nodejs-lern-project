const usersList = require('../data/users');

module.exports = {
    renderUsers(req, res) {
        res.render('users/users', { usersList: usersList });
    },

    renderUser(req, res) {
        let user = usersList.find(user => user.id == req.params.id);
        res.render('users/user', {user: user.name});
    }
}