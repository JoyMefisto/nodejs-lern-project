const express = require('express');
const path = require('path');

const admin = express();

const routers = require('./routers');
const middleware = require('./middleware');

admin.set('views', path.join(__dirname, 'views'));
admin.set('view engine', 'pug');

admin.on('mount', server => {
    admin.locals = Object.assign(server.locals, admin.locals);
});

admin.use(middleware.auth.allowAdmin);

admin.use('/', routers.adminRouter);
admin.use('/news', routers.newsRouter);
admin.use('/', routers.gameRouter); // /:game


module.exports = admin;