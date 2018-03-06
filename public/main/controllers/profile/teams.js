const { team: Team, game: Game, player: Player } = require('../../../../shared/models');
const { ObjectID } = require('mongodb');

module.exports = {
    showMyTeams(req, res, next) {
        res.render('profile/teams/teams', {
            player: req.player,
            teams: req.teams,
            myTeams: req.myTeams
        })
    },
    // GET /profile/teams/:team_id
    showOneTeam(req, res) {
        res.render('profile/teams/team', { oneTeam: req.team, listPlayers: req.players, game: req.game })
    },

    // GET /profile/teams/create
    showPageCreateTeam(req, res, next) {
        Game.find({}).then(games => {
            res.render('profile/teams/create', { player: req.player, team: new Team(), game: req.game, games: games });
        });
    },

    // POST /profile/teams/create
    createTeam(req, res, next) {
        let
            _id = ObjectID(Date.now()),
            { nameTeam, listGameTeam, creatorTeam } = req.body;

        Team.create({
            _id,
            nameTeam,
            listGameTeam,
            creatorTeam
        })
            .then((team) => {
                res.redirect(`/profile`)
            })
            .catch(next);
    },

    // GET /profile/teams/:team_id/update
    showPageUpdateTeam(req, res, next) {
        Game.find({}).then(games => {
            res.render('profile/teams/update', {
                team: req.team,
                players: req.players,
                game: req.game,
                games: games
            });
        });

    },
    // POST /profile/teams/:team_id/update
    updateTeam(req, res, next) {
        Team.findByIdAndUpdate(req.body.id, req.body)
            .then(team => res.redirect(`/profile`))
            .catch(next);
    },
    // GET /profile/teams/:team_id/delete
    showPageDeleteTeam(req, res, next) {
        res.render('profile/teams/delete', {
            team: req.team,
            game: req.game
        });
    },
    // POST /profile/teams/:team_id/delete
    deleteTeam(req, res, next) {
        req.team.remove()
            .then(() => res.redirect(`/profile`))
            .catch(next);
    },
    // POST /profile/teams/searchPlayer
    searchPlayer(req, res, next) {
        let regex = new RegExp(req.body.value, 'gi');
        Player.find({
            $or: [
                { email: regex },
                { name: regex }
            ]
        })
            .then(result => {
                let players = result.map(player => {
                    return {
                        _id: player._id,
                        name: player.name,
                        email: player.email,
                    }
                });
                res.send(players);
            })
            .catch(next);

    },
    addPlayerInTeam(req, res, next) {
        let { team_id, player_id } = req.body;

        Player.update({ _id: player_id}, {$addToSet: { teams: ObjectID(team_id) }}).then(player => {
            res.send(player);

        });
    },
    deletePlayerInTeam(req, res, next) {
        let { team_id, player_id } = req.body;

        Player.update({ _id: player_id}, {$pull: { teams: ObjectID(team_id) }}).then(player => {
            res.send(player);
        });
    },
};