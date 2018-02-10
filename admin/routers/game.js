const { Router } = require('express');
const router = Router();

const game = require('../controllers/game');

router.param('game', game.setParamGame);
router.param('team_id', game.setParamTeamId);
router.param('player_id', game.setParamPlayerId);
router.param('tournament_id', game.setParamTournamentId);

router.get('/:game', game.showGame); // GET /:game - Страница одной из игр (dota2|csgo|lol|hearthstone|overwatch)
router.get('/:game/teams', game.showListTeams); // GET /:game/team - список команд этой игры

router.route('/:game/teams/create')
    .get(game.showPageCreateTeam)
    .post(game.createTeam);

router.route('/:game/teams/:team_id/update')
    .get(game.showPageUpdateTeam)
    .post(game.updateTeam);

router.route('/:game/teams/:team_id/delete')
    .get(game.showPageDeleteTeam)
    .post(game.deleteTeam);

router.get('/:game/teams/:team_id', game.showOneTeam); // GET /:game/team/:id - страница команды, этой игры

/**
 * @title {Players}
 */
router.get('/:game/players', game.showListPlayersGame); // GET /:game/player/ - список игроков этой игры

router.route('/:game/players/create')
    .get(game.showPageCreatePlayer)
    .post(game.createPlayer);

router.route('/:game/players/:player_id/update')
    .get(game.showPageUpdatePlayer)
    .post(game.updatePlayer);

router.route('/:game/players/:player_id/delete')
    .get(game.showPageDeletePlayer)
    .post(game.deletePlayer);

router.get('/:game/players/:player_id', game.showOnePlayerGame); // GET /:game/player/:_id - игрок этой игры

/**
 * @title {Tournaments}
 */
router.get('/:game/tournaments', game.showListTournamentsGame); // GET /:game/tournaments - список турниров

router.route('/:game/tournaments/create')
    .get(game.showPageCreateTournament)
    .post(game.createTournament);

router.route('/:game/tournaments/:tournament_id/update')
    .get(game.showPageUpdateTournament)
    .post(game.updateTournament);

router.route('/:game/tournaments/:tournament_id/delete')
    .get(game.showPageDeleteTournament)
    .post(game.deleteTournament);

router.get('/:game/tournaments/:tournament_id', game.showOneTournamentGame); // GET /:game/tournament/:id - страница турнира, с турнирной сеткой

module.exports = router;