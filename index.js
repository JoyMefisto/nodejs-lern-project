const express = require('express');
const morgan = require('morgan');
const path = require('path');
const server  = express();
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

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
} = require('./routers/routers');

/**
 * @title - Установка механизма представления handlebars
 */
server.engine('handlebars', handlebars.engine);
server.set('view engine', 'handlebars');

server.set('port', process.env.PORT || 3000);
server.use(express.static(path.join(__dirname, 'public')));
server.use(morgan('dev'));

/**
 * @title - Middleware
 */
server.get('/', homeRouter);
server.get('/search', searchRouter);
server.get('/about', aboutRouter);
server.use('/users', usersRouter);

server.use(notFoundRouter);
server.use(serverErrorRouter);

server.listen(server.get('port'), () => console.log(`localhost:${server.get('port')}`)  );
