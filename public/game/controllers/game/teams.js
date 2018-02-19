const { team: Team } = require('../../../../shared/models');

module.exports = {
    // GET /:game/teams
    showListTeams(req, res) {
        let baseUrl = `/${req.game}/teams`;
        Team.find({ game: req.game }).then(teams => res.render('teams/teams', {teams: teams, baseUrl: baseUrl, game: req.game}))
    },
    // GET /:game/teams/:team_id
    showOneTeam(req, res) {
        res.render('teams/team', { oneTeam: req.team, listPlayers: req.players, game: req.game })
    },
}