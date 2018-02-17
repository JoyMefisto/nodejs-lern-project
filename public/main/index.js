const express = require('express');
const path = require('path');

const { auth: middlewareAuth } = require('../middleware');
const routers = require('./routers');

const main = express();

main.set('views', path.join(__dirname, '..', 'views'));
main.set('view engine', 'pug');

main.on('mount', server => {
    main.locals = Object.assign(server.locals, main.locals);
});
// main.use(middlewareAuth.findUser);
main.use('/', routers.homeRouter);

// main.use('/users', routers.usersRouter);
main.use('/news', routers.newsRouter);
main.use('/auth', routers.authRouter);
main.use('/profile', middlewareAuth.authenticated, routers.profileRouter);


module.exports = main;