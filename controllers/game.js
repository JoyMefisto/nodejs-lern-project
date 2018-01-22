const listGames = require('../data/games');
const listTeams = require('../data/dota_team');
const listPlayers = require('../data/dota_team_player');
const listTournaments = require('../data/tournaments');
let baseUrl = '';

/**
 * @codedojo
 * Данные по командам и данные по игрокам, используются только из одной команды и одних игроко
 * В будущем, когда я буду делать коллекции в бд, я добавлю больше команд и игроков
 */


module.exports = {
    showGame(req, res) {
        let game = listGames.find( oneGame => oneGame.game == req.params.game);
        console.log(game);
        res.render(`games/${req.params.game}`, { game: game });
    },
    showListTeams(req, res) {
        let baseUrl = `/${req.params.game}/teams`;
        res.render('teams', {teams: listTeams, baseUrl: baseUrl});
    },
    showOneTeam(req, res) {
        let oneTeam = listTeams.find( oneTeam => oneTeam.id == req.params.team_id);
        res.render('team', {oneTeam: oneTeam, listPlayers: listPlayers, game: req.params.game});
    },

    showListPlayersTeam(req, res) {
        res.render('players', { listPlayers: listPlayers })
    },
    showListPlayersGame(req, res) {
        res.render('players', { listPlayers: listPlayers, game: req.params.game })
    },
    showOnePlayerGame(req, res) {
        let onePlayer = listPlayers.find( onePlayer => onePlayer.id == req.params.player_id);
        res.render('player', { onePlayer: onePlayer })
    },
    showOnePlayerTeam(req, res){
        let onePlayer = listPlayers.find( onePlayer => onePlayer.id == req.params.players_id);
        res.render('players', { onePlayer: onePlayer })
    },

    showListTournamentsGame(req, res){
        console.log(listTournaments);
        res.render('tournaments', { listTournaments: listTournaments, game: req.params.game})
    },
    showOneTournamentGame(req, res){
        let oneTournament = listTournaments.find( oneTournament => oneTournament.id == req.params.tournament_id);
        res.render('tournament', { oneTournament: oneTournament, listTeams: listTeams, game: req.params.game })
    },
    showListTeamsTournamentGame(req, res) {
        let baseUrl = `/${req.params.game}/teams`;

        res.render('teams', {teams: listTeams, baseUrl: baseUrl});
    },
    showOneTeamTournamentGame(req, res){
        let oneTeam = listTeams.find( oneTeam => oneTeam.id == req.params.team_id);
        res.render('team', {oneTeam: oneTeam});
    }

};
