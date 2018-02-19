const { player: Player } = require('../../../../shared/models');

module.exports = {
    // GET /:game/players
    showListPlayersGame(req, res, next) {
        Player.find({ game: req.game })
            .populate('team')
            .then(players => {
                console.log(players);
                res.render('players/players', { listPlayers: players, game: req.game })
            }).catch(next);
    },
    // GET /:game/players/:player_id
    showOnePlayerGame(req, res, next) {
        Player.findById(req.player_id)
            .then(player => {
                res.render('players/player', { onePlayer: player, game: req.game })
            }).catch(next)
    }
}