const homeRouter = require('./home');
const searchRouter = require('./search');
const aboutRouter = require('./about');
const notFoundRouter = require('./404');
const serverErrorRouter = require('./500');
const usersRouter = require('./users');

module.exports = {
    homeRouter,
    searchRouter,
    aboutRouter,
    notFoundRouter,
    serverErrorRouter,
    usersRouter
}