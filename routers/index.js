const homeRouter = require('./home');
const usersRouter = require('./users');
const newsRouter = require('./news');
const gameRouter = require('./game');
const notFoundRouter = require('./404');
const serverErrorRouter = require('./500');

module.exports = {
    homeRouter,
    usersRouter,
    newsRouter,
    gameRouter,
    notFoundRouter,
    serverErrorRouter
};



