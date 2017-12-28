const express = require('express');
const morgan = require('morgan');
const pug = require('pug');

const config = require('./config');

const server  = express();

/**
 * @title - Routers
 */
const {
    homeRouter,
    searchRouter,
    aboutRouter,
    notFoundRouter,
    serverErrorRouter,
    usersRouter
} = require('./routers');

/**
 * @title - Установка механизма шаблонизатора pug
 */
server.set('view engine', 'pug');
server.set('views', config.paths.views);

server.set('port', process.env.PORT || 3000);
server.use(express.static(config.paths.public));
server.use('/lib', express.static(config.paths.lib));
server.use(morgan('dev'));

/**
 * @title - Middleware
 */
server.use('/', homeRouter);
server.use('/search', searchRouter);
server.use('/about', aboutRouter);
server.use('/users', usersRouter);

server.use(notFoundRouter);
server.use(serverErrorRouter);

server.listen(server.get('port'), () => console.log(`localhost:${server.get('port')}`)  );
