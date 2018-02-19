const { tournament: Tournament } = require('../../../../shared/models');

module.exports = {
    // GET /:game/tournaments
    showListTournamentsGame(req, res, next){
        Tournament.find({ game: req.game })
            .then(tournaments => {
                res.render('tournaments/tournaments', { listTournaments: tournaments, game: req.game})
            }).catch(next)
    },
    // GET /:game/tournaments/:tournament_id
    showOneTournamentGame(req, res){
        res.render('tournaments/tournament', { oneTournament: req.tournament, listTeams: req.teams, game: req.game })
    }
}