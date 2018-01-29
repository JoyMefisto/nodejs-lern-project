# nodejs-lern-project
Project on Express.js

## info
- `@codedojo` - По этому флагу находится вопрос
- `sudo kill $(sudo lsof -t -i:3000)` - kill port
- Ориентируюсь на [этот](http://game-tournaments.com/) проект

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
 /news/news_id - Новость
 /users - Зрители
 /users/:user_id - Зритель
 
 /:game - страница конкретной игры, с её описанием(рейтинг, кол-во прошедших турниров, etc)
 /:game/teams - список команд этой игры
 /:game/teams/:team_id - команда этой игры с выводом игроков этой команды
 
 /:game/players - список игроков этой игры
 /:game/players/:player_id - игрок этой игры
 
 /:game/tournaments - список турниров
 /:game/tournaments/:tournament_id - страница турнира, с турнирной сеткой и списком команд
 
 /admin - административная часть под вопросом
```

##### TODO
```
// todo: 1. Написать роуты, навигацию и контроллеры - Готово
// todo: 2. Стилизовать навигацию
// todo: 3. Настроить сборку
// todo: 4. Насписать ТЗ
// todo: 5. Стилизовать остальные страницы
// todo: 6. Поставить БД Монгу - mongoose
// todo: 7. Подключить монгу к сервису


// todo: Посмотреть на способ динамического генерирования контроллеров__
```