const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const admin = require('./admin');
const main = require('./main');
const game = require('./main/game');

const routers = require('./main/routers');
const config = require('./shared/config');
const middleware = require('./shared/middleware');
const { auth } = require('./main/middleware');
const db = require('./shared/services/mongodb/db');
const server  = express();

server.set('view engine', 'pug');
server.set('views', config.paths.views);
server.set('port', config.port);

server.locals = Object.assign({}, server.locals, config);

server.locals.basedir = config.paths.views;

server.use(favicon(config.paths.favicon));
server.use(express.static(config.paths.public));
server.use('/lib', express.static(config.paths.lib));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(morgan('dev'));

// server.use(session({
//     name: 'sessionId',
//     secret: config.sessionSecret,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         // secure: true,
//         signed: true,
//         maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days
//     },
//     store: new MongoStore({
//         mongooseConnection: db.connection,
//         ttl: 60 * 60 * 24 * 3, // 3 days
//         touchAfter: 60 * 60 * 24 // 1 day
//     })
// }));

// server.use(auth.findUser);
// server.use('/', routers.homeRouter);
// server.use('/auth', routers.authRouter);
// server.use(auth.authenticated);
//
// server.use('/profile', routers.profileRouter);
// server.use('/users', routers.usersRouter);
// server.use('/news', routers.newsRouter);

server.use('/', main);
server.use('/admin', admin);
server.use('/', game); // /:game

server.use(middleware.notFoundRouter);
server.use(middleware.serverErrorRouter);

server.listen(config.port, () => console.log('localhost:', config.port) );