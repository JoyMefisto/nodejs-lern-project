const router = require('express').Router();
const { team: Team } = require('../../../shared/models');
const { profile: { profile, teams, tournaments } } = require('../controllers');
const { params } = require('../../controllers');

router.use(profile.findTeams, profile.findMyTeams, profile.findTournaments, profile.findMyTournaments);

router.param('game', params.setParamGame);
router.param('team_id', params.setParamTeamId);
router.param('player_id', params.setParamPlayerId);
router.param('tournament_id', params.setParamTournamentId);


/**
 * @title Teams
 */
// GET /profile
router.get('/', profile.showProfile);
router.post('/updateGameList', profile.updateGameList);
router.get('/teams', teams.showMyTeams);
router.post('/teams/searchPlayer', teams.searchPlayer);
router.post('/teams/addPlayerInTeam', teams.addPlayerInTeam);
router.post('/teams/deletePlayerInTeam', teams.deletePlayerInTeam);

router.route('/teams/create')
    .get(teams.showPageCreateTeam)
    .post(teams.createTeam);

router.get('/teams/:team_id', teams.showOneTeam);

router.route('/teams/:team_id/update')
    .get(teams.showPageUpdateTeam)
    .post(teams.updateTeam);

router.route('/teams/:team_id/delete')
    .get(teams.showPageDeleteTeam)
    .post(teams.deleteTeam);

/**
 * @title Tournaments
 */
// GET /profile
router.get('/tournaments', tournaments.showMyTournaments);
router.post('/tournaments/searchTournament', tournaments.searchTournament);
router.post('/tournaments/addTeamInTournament', tournaments.addTeamInTournament);
router.post('/tournaments/deleteTeamInTournament', tournaments.deleteTeamInTournament);

router.route('/tournaments/create')
    .get(tournaments.showPageCreateTournament)
    .post(tournaments.createTournament);

router.get('/tournaments/:tournament_id', tournaments.showOneTournament);

router.route('/tournaments/:tournament_id/update')
    .get(tournaments.showPageUpdateTournament)
    .post(tournaments.updateTournament);

router.route('/tournaments/:tournament_id/delete')
    .get(tournaments.showPageDeleteTournament)
    .post(tournaments.deleteTournament);


module.exports = router;