const listGames = require('../data/games');
const listTeam = require('../data/dota_team');
const listPlayer = require('../data/dota_team_player');
const listTournament = require('../data/tournament');

/**
 * @codedojo
 * Данные по командам и данные по игрокам, используются только из одной команды и одних игроко
 * В будущем, когда я буду делать коллекции в бд, я добавлю больше команд и игроков
 */


module.exports = {
    showGame(req, res) {
        res.render(`games/${req.params.game}`, {games: listGames});
    },
    showListTeam(req, res) {
        res.render('team', {team: listTeam});
    },
    showOneTeam(req, res) {
        let oneTeam = listTeam.find( oneTeam => oneTeam.id == req.params.id);
        res.render('one_team', {oneTeam: oneTeam});
    },

    showListPlayerTeam(req, res) {
        res.render('player', { listPlayer: listPlayer })
    },
    showListPlayerGame(req, res) {
        res.render('player', { listPlayer: listPlayer })
    },
    showOnePlayerGame(req, res) {
        let onePlayer = listPlayer.find( onePlayer => onePlayer.id == req.params._id);
        res.render('one_player', { onePlayer: onePlayer })
    },
    showOnePlayerTeam(req, res){
        let onePlayer = listPlayer.find( onePlayer => onePlayer.id == req.params._id);
        res.render('one_player', { onePlayer: onePlayer })
    },

    showListTournamentGame(req, res){
        res.render('tournament', { listTournament: listTournament})
    },
    showOneTournamentGame(req, res){
        let oneTournament = listTournament.find( oneTournament => oneTournament.id == req.params.id);
        res.render('one_tournament', { oneTournament: oneTournament})

    },


    showOneTeamTournamentGame(req, res){
        let oneTeam = listTeam.find( oneTeam => oneTeam.id == req.params.team_id);
        res.render('one_team', {oneTeam: oneTeam});
    }

};
