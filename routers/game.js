const { Router } = require('express');
const router = Router();

const game = require('../controllers/game');

router.get('/:game', game.showGame); // GET /:game - Страница одной из игр (dota2|csgo|lol|hearthstone|overwatch)
router.get('/:game/teams', game.showListTeams); // GET /:game/team - список команд этой игры
router.get('/:game/teams/:team_id', game.showOneTeam); // GET /:game/team/:id - страница команды, этой игры

/**
 * @codedojo
 * Пока не знаю, есть ли смысл делать два роута, для вывода списка игроков команды и игры (см. следующие два роута)
 */
router.get('/:game/players', game.showListPlayersGame); // GET /:game/player/ - список игроков этой игры
router.get('/:game/teams/:team_id/players', game.showListPlayersTeam); // GET /:game/team/:id/player - список игроков этой команды

/**
 * @codedojo
 * Эти два роута зависят от решения с верхними двумя роутами, как сделать лучше? =)
 */
router.get('/:game/players/:player_id', game.showOnePlayerGame); // GET /:game/player/:_id - игрок этой игры
router.get('/:game/teams/:team_id/players/:player_id', game.showOnePlayerTeam); // GET /:game/team/:id/player/:_id - игрок этой команды

router.get('/:game/tournaments', game.showListTournamentsGame); // GET /:game/tournaments - список турниров
router.get('/:game/tournaments/:tournament_id', game.showOneTournamentGame); // GET /:game/tournament/:id - страница турнира, с турнирной сеткой
router.get('/:game/tournaments/:tournament_id/teams', game.showListTeamsTournamentGame); // GET /:game/tournament/:id/:team - команда внутри турнира
router.get('/:game/tournaments/:tournament_id/teams/:team_id', game.showOneTeamTournamentGame); // GET /:game/tournament/:id/:team - команда внутри турнира

/**
 * @codedojo
 * Верхний роут, я хотел сделать по другому - в первом методе хотел сохранить /:team_id в res.locals.id,
 * чтобы во втором методе использовать, но не получилось. =(
 * Как здесь я могу использовать next()?
 */
// router.get('/:game/tournaments/:tournament_id/:team_id', game.showOneTeamTournamentGame, game.showOneTeam);


module.exports = router;