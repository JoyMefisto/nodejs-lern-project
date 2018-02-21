const router = require('express').Router();
const { team: Team } = require('../../../shared/models');
const { profile } = require('../controllers');

// GET /profile
router.use(profile.findTeams, profile.findMyTeams);

router.get('/', profile.showProfile);

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