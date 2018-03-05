const { game: Game, team: Team, player: Player, tournament: Tournament } = require('../../shared/models');

module.exports = {
    setParamGame(req, res, next, game) { // /:game
        req.game = game;
        next();
    },
    setParamTeamId(req, res, next, team_id) { // /:game/team/:team_id
        Team.findById(team_id)
            .populate('players')
            .then(team => {
                req.team = team;
                req.players = team.players;
                next();
            }).catch(next);

    },

    setParamPlayerId(req, res, next, player_id) { // /:game/players/:player_id
        req.player_id = player_id;
        next();
    },
    setParamTournamentId(req, res, next, tournament_id) { // /:game/tournaments/:tournament_id
        Tournament.findById(tournament_id)
            .populate('teams')
            .then(tournament => {
                console.log('setParamTournamentId', tournament);
                req.tournament = tournament;
                req.tournamentTeams = tournament.teams;
                next();
            }).catch(next);
    }
};