const express = require('express');
const server  = express();
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

// Установка механизма представления handlebars
server.engine('handlebars', handlebars.engine);
server.set('view engine', 'handlebars');

server.set('port', process.env.PORT || 3000);
server.use(express.static(__dirname + '/public'));

/**
 * @title - Routers
 */
const homeRouter = require('./routers/home');
const searchRouter = require('./routers/search');
const aboutRouter = require('./routers/about');
const notFoundRouter = require('./routers/404');
const serverErrorRouter = require('./routers/500');

server.set('port', process.env.PORT || 3000);
server.use(express.static(__dirname + '/public'));

/**
 * @title - Middleware
 */
server.get('/', homeRouter);
server.get('/search', searchRouter);
server.get('/about', aboutRouter);
server.use(notFoundRouter);
server.use(serverErrorRouter);

server.listen(server.get('port'), () => console.log(`localhost:${server.get('port')}`)  );
