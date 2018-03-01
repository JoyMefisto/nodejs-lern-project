const router = require('express').Router();
const { team: Team } = require('../../../shared/models');
const { profile } = require('../controllers');
const { params } = require('../../controllers');

router.use(profile.findTeams, profile.findMyTeams);

router.param('game', params.setParamGame);
router.param('team_id', params.setParamTeamId);
router.param('player_id', params.setParamPlayerId);
router.param('tournament_id', params.setParamTournamentId);

// GET /profile
router.get('/', profile.showProfile);
router.post('/updateGameList', profile.updateGameList);
router.get('/teams', profile.showMyTeams);
router.post('/teams/searchPlayer', profile.searchPlayer);
router.post('/teams/addPlayerInTeam', profile.addPlayerInTeam);
router.post('/teams/deletePlayerInTeam', profile.deletePlayerInTeam);

router.route('/teams/create')
    .get(profile.showPageCreateTeam)
    .post(profile.createTeam);

router.get('/teams/:team_id', profile.showOneTeam);

router.route('/teams/:team_id/update')
    .get(profile.showPageUpdateTeam)
    .post(profile.updateTeam);

router.route('/teams/:team_id/delete')
    .get(profile.showPageDeleteTeam)
    .post(profile.deleteTeam);


module.exports = router;