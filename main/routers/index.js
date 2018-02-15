const homeRouter = require('./home');
const authRouter = require('./auth');
const profileRouter = require('./profile');
const usersRouter = require('./users');
const newsRouter = require('./news');
const gameRouter = require('../game/routers/game');

module.exports = {
    homeRouter,
    authRouter,
    profileRouter,
    usersRouter,
    newsRouter,
    gameRouter
};



