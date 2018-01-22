const usersList = require('../data/users');

module.exports = {
    renderUsers(req, res) {
        res.render('users', { usersList: usersList });
    },

    renderUser(req, res) {
        let user = usersList.find(user => user.id == req.params.id);
        res.render('user', {user: user.name});
    }
}