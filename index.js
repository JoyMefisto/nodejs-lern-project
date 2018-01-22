const express = require('express');
const server  = express();

const morgan = require('morgan');
const pug = require('pug');

const routers = require('./routers');
const config = require('./config');

/**
 * @title - Установка механизма шаблонизатора pug
 */
server.set('view engine', 'pug');
server.set('views', config.paths.views);

server.set('port', process.env.PORT || 3000);
server.use(express.static(config.paths.public));
server.use('/lib', express.static(config.paths.lib));
server.use(morgan('dev'));


server.use('/', routers.homeRouter);
server.use('/users', routers.usersRouter);
server.use('/news', routers.newsRouter);

server.use('/', routers.gameRouter); // /:game

server.use(routers.notFoundRouter);
server.use(routers.serverErrorRouter);

server.listen(server.get('port'), () => console.log(`localhost:${server.get('port')}`)  );
