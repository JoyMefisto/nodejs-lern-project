# nodejs-lern-project
Project on Express.js
Учебный проект в рамках курса "Node.js в действии" от codedojo
## info
- `@codedojo` - По этому флагу находится вопрос
- `sudo kill $(sudo lsof -t -i:3000)` - kill port
- `sudo mongod` - запуск mongoDB
- Ориентируюсь на [этот](http://game-tournaments.com/) проект

#### Install
- `cd nodejs-lern-project`
- `npm install`

#### Run
- `cd nodejs-lern-project`
- `npm run dev`
- `localhost:3000`


##### Routers
* `/` - главная страница
* Статьи
    * `/news` - Список статей
    * `/news/news_id` - Статья
* Зрители - раздел удалиться
    * `/users` - Список зрителей 
    * `/users/:user_id` - Зритель
 * Игры(Dota2, CS:GO, LOL, Hearthstone, Overwatch)
    * `/:game` - страница конкретной игры, с её описанием(рейтинг, кол-во прошедших турниров, etc)
    * Команды
        * `/:game/teams` - список команд этой игры
        * `/:game/teams/:team_id` - команда этой игры с выводом игроков этой команды
    * Игроки
        * `/:game/players` - список игроков этой игры
        * `/:game/players/:player_id` - игрок этой игры
    Турниры
        * `/:game/tournaments` - список турниров
        * `/:game/tournaments/:tournament_id` - страница турнира, с турнирной сеткой и списком команд
     
* `/admin` - административная часть под вопросом
* Статьи
    * `/news` - Список статей
    * `/news/:news_id` - Статья
    * `/news/create` - Создание статьи
    * `/news/:news_id/update` - Редактирование статьи
    * `/news/:news_id/delete` - Удаление статьи
* Зрители - раздел удалиться
    * `/users` - Список зрителей 
    * `/users/:user_id` - Зритель
 * Игры(Dota2, CS:GO, LOL, Hearthstone, Overwatch)
    * `/:game` - страница конкретной игры, с её описанием(рейтинг, кол-во прошедших турниров, etc)
    * Команды
        * `/:game/teams` - список команд этой игры
        * `/:game/teams/:team_id` - команда этой игры с выводом игроков этой команды
        * `/:game/teams/create` - Создание команды
        * `/:game/teams/:team_id/update` - Редактирование команды
        * `/:game/teams/:team_id/delete` - Удаление команды
    * Игроки
        * `/:game/players` - список игроков этой игры
        * `/:game/players/:player_id` - игрок этой игры
        * `/:game/players/create` - Создание игрока
        * `/:game/players/:player_id/update` - Редактирование игрока
        * `/:game/players/:player_id/delete` - Удаление игрока
    Турниры
        * `/:game/tournaments` - список турниров
        * `/:game/tournaments/:tournament_id` - страница турнира, с турнирной сеткой и списком команд
        * `/:game/tournaments/create` - Создание турнира
        * `/:game/tournaments/:tournament_id/update` - Редактирование турнира
        * `/:game/tournaments/:tournament_id/delete` - Удаление турнира

##### TODO
```
// todo: 1. Написать роуты, навигацию и контроллеры - Готово
// todo: 2. Стилизовать навигацию - Готово
// todo: 3. Насписать ТЗ - в процессе
// todo: 4. Написать - схемы, модели на mongoose, коллекции в mongodb - Готово
// todo: 5. Подключить монгу к сервису

// todo: Посмотреть на способ динамического генерирования контроллеров
```

