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
        Tournament.find({ '_id': { $in: req.teams.tournaments } })
            .then(tournaments => {
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
    showProfile(req, res, next) {
        Game.find({}).then(games => {
            res.render('profile/profile', {
                player: req.player,
                teams: req.teams,
                myTeams: req.myTeams,
                myTournaments: req.myTournaments,
                games
            });
        }).catch(next);

    },
    updateGameList(req, res, next){
        Player.findByIdAndUpdate(req.body.id, req.body)
              .then(player => res.redirect('/profile') )
              .catch(next);
    }
};