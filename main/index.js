const express = require('express');
const path = require('path');

const middleware = require('./middleware');
const routers = require('./routers');

const main = express();

main.set('views', path.join(__dirname, 'views'));
main.set('view engine', 'pug');

main.on('mount', server => {
    main.locals = Object.assign(server.locals, main.locals);
});

// main.use(middleware.findUser);
main.use('/', routers.homeRouter);
// main.use('/auth', routers.authRouter);
// main.use(middleware.authenticated);

main.use('/profile', routers.profileRouter);
main.use('/users', routers.usersRouter);
main.use('/news', routers.newsRouter);
// main.use('/', routers.gameRouter); // /:game


module.exports = main;