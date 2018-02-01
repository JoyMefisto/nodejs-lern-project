const listGames = require('../data/games');
const listTeams = require('../data/dota_team');
const listPlayers = require('../data/dota_team_player');
const listTournaments = require('../data/tournaments');

const { game: Game, team: Team, player: Player } = require('../models');

module.exports = {
    setParamGame(req, res, next, game) { // /:game
        req.game = game;
        next();
    },
    setParamTeamId(req, res, next, team_id) { // /:game/team/:team_id
        req.team_id = team_id;

        Team.findById(team_id).then(team => {
            req.team_id_some = team;

            Player.find({ team_id: team.team_id }).then(players => {
                req.players = players;
                next();
            }).catch(next);

        } ).catch(next);

    },
    setParamPlayerId(req, res, next, player_id) { // /:game/players/:player_id
        console.log('setParamPlayerId', player_id);
        req.player_id = player_id;
        next();
    },
    setParamTournamentId(req, res, next, tournament_id) { // /:game/tournaments/:tournament_id
        req.tournament_id = tournament_id;
        next();
    },
    // GET /:game
    showGame(req, res) {
        Game.findOne({ game: req.game}).then(game => res.render('game', game));
    },
    // GET /:game/teams
    showListTeams(req, res) {
        let baseUrl = `/${req.game}/teams`;
        Team.find({}).then(teams => res.render('teams/teams', {teams: teams, baseUrl: baseUrl, game: req.game}))

    },
    // GET /:game/teams/:team_id
    showOneTeam(req, res) {
        Team.findById(req.team_id).then(team => {
            res.render('teams/team', { oneTeam: team, listPlayers: req.players, game: req.game })
        });
    },
    // GET /:game/players
    showListPlayersGame(req, res) {
        res.render('players/players', { listPlayers: listPlayers, game: req.params.game })
    },
    // GET /:game/players/:player_id
    showOnePlayerGame(req, res) {
        Player.findById(req.player_id).then(player => res.render('players/player', { onePlayer: player, game: req.game }))
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
