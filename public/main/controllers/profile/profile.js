const { team: Team, game: Game, player: Player, tournament: Tournament } = require('../../../../shared/models');
const { ObjectID } = require('mongodb');

module.exports = {
    findTeams(req, res, next) {
        Team.find({ '_id': { $in: req.player.teams } })
            .then(teams => {
                 req.teams = teams;
                 next()
            }).catch(next);
    },
    findTournaments(req, res, next) {
        console.log('tournaments', req.teams);
        Tournament.find({ '_id': { $in: req.teams.tournaments } })
            .then(tournaments => {
                console.log(tournaments);
                req.tournaments = tournaments;
                 next()
            }).catch(next);
    },
    findMyTeams(req, res, next){
        Team.find({creatorTeam: req.player._id})
            .then(teams => {
                req.myTeams = teams;
                next();
            })
            .catch(next)
    },
    findMyTournaments(req, res, next){
        Tournament.find({creatorTournament: req.player._id})
            .then(tournaments => {
                req.myTournaments = tournaments;
                next();
            })
            .catch(next)
    },
    // GET /profile
    showProfile(req, res) {
        Game.find({}).then(games => {
            res.render('profile/profile', {
                player: req.player,
                teams: req.teams,
                myTeams: req.myTeams,
                myTournaments: req.myTournaments,
                games
            })
        })

    },
    updateGameList(req, res, next){
        Player.findByIdAndUpdate(req.body.id, req.body)
              .then(player => res.redirect('/profile') )
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
    }
};