const { Router } = require('express');
const router = Router();

const { game, players, teams, tournaments } = require('../controllers');
const { params } = require('../../controllers');
const { auth } = require('../../middleware');

router.param('game', params.setParamGame);
router.param('team_id', params.setParamTeamId);
router.param('player_id', params.setParamPlayerId);
router.param('tournament_id', params.setParamTournamentId);

router.get('/:game', game.showGame); // GET /:game - Страница одной из игр (dota2|csgo|lol|hearthstone|overwatch)

router.get('/:game/teams', teams.showListTeams); // GET /:game/team - список команд этой игры

router.route('/:game/teams/create')
    .all(auth.authenticated, auth.allowUser)
    .get(game.showPageCreateTeam)
    .post(game.createTeam);

router.get('/:game/teams/:team_id', teams.showOneTeam); // GET /:game/team/:id - страница команды, этой игры

router.route('/:game/teams/:team_id/update')
    .all(auth.authenticated, auth.allowUser)
    .get(game.showPageUpdateTeam)
    .post(game.updateTeam);

router.route('/:game/teams/:team_id/delete')
    .all(auth.authenticated, auth.allowUser)
    .get(game.showPageDeleteTeam)
    .post(game.deleteTeam);

router.get('/:game/players', players.showListPlayersGame); // GET /:game/player/ - список игроков этой игры
router.get('/:game/players/:player_id', players.showOnePlayerGame); // GET /:game/player/:_id - игрок этой игры

router.get('/:game/tournaments', tournaments.showListTournamentsGame); // GET /:game/tournaments - список турниров
router.get('/:game/tournaments/:tournament_id', tournaments.showOneTournamentGame); // GET /:game/tournament/:id - страница турнира, с турнирной сеткой




module.exports = router;