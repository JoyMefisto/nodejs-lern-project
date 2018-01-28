const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');

const routers = require('./routers');
const config = require('./config');

const server  = express();

server.set('view engine', 'pug');
server.set('views', config.paths.views);
server.set('port', config.port);

server.locals = Object.assign({}, server.locals, config);

server.use(favicon(path.resolve(__dirname, config.paths.public, 'favicon.png')));
server.use(express.static(config.paths.public));
server.use('/lib', express.static(config.paths.lib));
console.log(config.paths.lib, 'lib');
server.use(morgan('dev'));

server.use('/', routers.homeRouter);
server.use('/users', routers.usersRouter);
server.use('/news', routers.newsRouter);
server.use('/', routers.gameRouter); // /:game

server.use(routers.notFoundRouter);
server.use(routers.serverErrorRouter);

server.listen(config.port, () => console.log('localhost:', config.port) );