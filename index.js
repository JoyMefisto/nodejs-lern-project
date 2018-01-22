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
    newsRouter,
    gameRouter,
    usersRouter,
    notFoundRouter,
    serverErrorRouter
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
server.use('/users', usersRouter);
server.use('/news', newsRouter);

server.use('/', gameRouter); // /:game

server.use(notFoundRouter);
server.use(serverErrorRouter);

server.listen(server.get('port'), () => console.log(`localhost:${server.get('port')}`)  );


/**
 * @routes:
 * / - главная страница с какой-то приветственной информацией
 * /news - Новости
 * /news/article - Новость
 * /users - Зрители
 * /users/:id - Зритель
 *
 * /:game - страница конкретной игры, с её описанием(рейтинг, кол-во прошедших турниров, etc)
 * /:game/:team - список команд этой игры
 * /:game/:team/:id - команда этой игры
 * /:game/:team/:player - список игроков это команды
 * /:game/player - список игроков это игры
 *
 * /:game/team/:id/player - список игроков этой команды
 * /:game/player/:_id - игрок этой игры
 * /:game/team/:id/player/:_id - игрок этой команды


 * /:game/tournament - список турниров
 * /:game/tournament/:id - страница турнира, с турнирной сеткой
 * /:game/tournament/:id/:team - команда внутри турнира
 */


// todo: 1. Написать роуты и контроллеры - на проверке
// todo: 2. Написать ТЗ
// todo: 3. Настроить сборку
// todo: 4. Сверстать вьюшки
// todo: 5. Поставить БД Монгу
// todo: 6. Доставать данные из Монги (перенести данные в монгу и доставать от туда же)

// todo: Посмотреть на способ динамического генерирования контроллеров

