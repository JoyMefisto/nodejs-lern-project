const listGames = require('../data/games');
const listTeams = require('../data/dota_team');
const listPlayers = require('../data/dota_team_player');
const listTournaments = require('../data/tournaments');

module.exports = {
    setParam(req, res, next, value) {
        console.log('setParam', value); // value: 'game', 'team_id', 'player_id', 'tournament_id'
        req[value] = value;
        next();
    },
    // GET /:game
    showGame(req, res) {
        let game = listGames.find( oneGame => oneGame.game == req.params.game);
        res.render('game', game);
    },
    // GET /:game/teams
    showListTeams(req, res) {
        let baseUrl = `/${req.params.game}/teams`;
        res.render('teams/teams', {teams: listTeams, baseUrl: baseUrl, game: req.params.game});
    },
    // GET /:game/teams/:team_id
    showOneTeam(req, res) {
        let oneTeam = listTeams.find( oneTeam => oneTeam.id == req.params.team_id);
        res.render('teams/team', {oneTeam: oneTeam, listPlayers: listPlayers, game: req.params.game});
    },
    // GET /:game/players
    showListPlayersGame(req, res) {
        res.render('players/players', { listPlayers: listPlayers, game: req.params.game })
    },
    // GET /:game/players/:player_id
    showOnePlayerGame(req, res) {
        let onePlayer = listPlayers.find( onePlayer => onePlayer.id == req.params.player_id);
        res.render('players/player', { onePlayer: onePlayer, game: req.params.game })
    },
    // GET /:game/tournaments
    showListTournamentsGame(req, res){
        res.render('tournaments/tournaments', { listTournaments: listTournaments, game: req.params.game})
    },
    // GET /:game/tournaments/:tournament_id
    showOneTournamentGame(req, res){
        let oneTournament = listTournaments.find( oneTournament => oneTournament.id == req.params.tournament_id);
        res.render('tournaments/tournament', { oneTournament: oneTournament, listTeams: listTeams, game: req.params.game })
    }
};
