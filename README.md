# nodejs-lern-project
Project on Express.js

## info
- `@codedojo` - По этому флагу находится вопрос

#### Install
- `cd nodejs-lern-project`
- `npm install`

#### Run
- `cd nodejs-lern-project`
- `npm run dev`
- `localhost:3000`


##### Routers
```
 / - главная страница с какой-то приветственной информацией
 /news - Новости
 /news/article - Новость
 /users - Зрители
 /users/:id - Зритель
 
 /:game - страница конкретной игры, с её описанием(рейтинг, кол-во прошедших турниров, etc)
 /:game/:team - список команд этой игры
 /:game/:team/:id - команда этой игры
 /:game/:team/:player - список игроков это команды
 
 /:game/player - список игроков это игры
 /:game/team/:id/player - список игроков этой команды
 /:game/player/:_id - игрок этой игры
 /:game/team/:id/player/:_id - игрок этой команды

 /:game/tournament - список турниров
 /:game/tournament/:id - страница турнира, с турнирной сеткой
 /:game/tournament/:id/:team - команда внутри турнира
```

##### TODO
```
// todo: 1. Написать роуты и контроллеры - на проверке
// todo: 2. Написать ТЗ
// todo: 3. Настроить сборку
// todo: 4. Сверстать вьюшки
// todo: 5. Поставить БД Монгу
// todo: 6. Доставать данные из Монги (перенести данные в монгу и доставать от туда же)

// todo: Посмотреть на способ динамического генерирования контроллеров__
```