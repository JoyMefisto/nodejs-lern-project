const express = require('express');
const path = require('path');

// const middleware = require('../middleware');
const { game: gameRouter } = require('./routers');

const game = express();

game.set('views', path.resolve(__dirname, 'views'));
game.set('view engine', 'pug');

game.on('mount', server => {
    game.locals = Object.assign(server.locals, game.locals);
});

game.use('/', gameRouter); // /:game


module.exports = game;