const { Router } = require('express');
const router = Router();

const game = require('../controllers/game');

router.param('game', game.setParamGame);
router.param('team_id', game.setParamTeamId);
router.param('player_id', game.setParamPlayerId);
router.param('tournament_id', game.setParamTournamentId);

router.get('/:game', game.showGame); // GET /:game - Страница одной из игр (dota2|csgo|lol|hearthstone|overwatch)
router.get('/:game/teams', game.showListTeams); // GET /:game/team - список команд этой игры
router.get('/:game/teams/:team_id', game.showOneTeam); // GET /:game/team/:id - страница команды, этой игры

router.get('/:game/players', game.showListPlayersGame); // GET /:game/player/ - список игроков этой игры
router.get('/:game/players/:player_id', game.showOnePlayerGame); // GET /:game/player/:_id - игрок этой игры

router.get('/:game/tournaments', game.showListTournamentsGame); // GET /:game/tournaments - список турниров
router.get('/:game/tournaments/:tournament_id', game.showOneTournamentGame); // GET /:game/tournament/:id - страница турнира, с турнирной сеткой

module.exports = router;