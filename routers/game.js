const { Router } = require('express');
const router = Router();

const game = require('../controllers/game');

// GET /:game - Страница одной из игр (dota2|csgo|lol|hearthstone|overwatch)
router.get('/:game', game.showGame);
// GET /:game/team - список команд этой игры
router.get('/:game/team', game.showListTeam);
// GET /:game/team/:id - страница команды, этой игры
router.get('/:game/team/:id', game.showOneTeam);

/**
 * @codedojo
 * Пока не знаю, есть ли смысл делать два роута, для вывода списка игроков команды и игры (см. следующие два роута)
 */
// GET /:game/player/ - список игроков этой игры
router.get('/:game/player', game.showListPlayerGame);
// GET /:game/team/:id/player - список игроков этой команды
router.get('/:game/team/:id/player', game.showListPlayerTeam);

/**
 * @codedojo
 * Эти два роута зависят от решения с верхними двумя роутами, как сделать лучше? =)
 */
// GET /:game/player/:_id - игрок этой игры
router.get('/:game/player/:_id', game.showOnePlayerGame);
// GET /:game/team/:id/player/:_id - игрок этой команды
router.get('/:game/team/:id/player/:_id', game.showOnePlayerTeam);



// GET /:game/tournament - список турниров
router.get('/:game/tournament', game.showListTournamentGame);

// GET /:game/tournament/:id - страница турнира, с турнирной сеткой
router.get('/:game/tournament/:id', game.showOneTournamentGame);

// GET /:game/tournament/:id/:team - команда внутри турнира
router.get('/:game/tournament/:id/:team_id', game.showOneTeamTournamentGame);
/**
 * @codedojo
 * Верхний роут, я хотел сделать по другому - в пером методе хотел сохранить /:team_id в res.locals.id,
 * чтобы во втором методе использовать, но не получилось. =(
 * Как здесь я могу использовать next()?
 */
// router.get('/:game/tournament/:id/:team_id', game.showOneTeamTournamentGame, game.showOneTeam);


module.exports = router;