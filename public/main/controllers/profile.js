const { team: Team, game: Game } = require('../../../shared/models');
const { ObjectID } = require('mongodb');

module.exports = {
    findTeams(req, res, next) {
        Team.find({ '_id': { $in: req.player.teams } })
            .then(teams => {
                 req.teams = teams;
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
    // GET /profile
    showProfile(req, res) {
        res.render('profile/profile', {
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
            console.log(games);
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
                console.log(team);
                res.redirect(`/profile`)
            })
            .catch(next);
    },
    // GET /profile/teams/:team_id/update
    showPageUpdateTeam(req, res, next) {
        Game.find({}).then(games => {

            res.render('profile/teams/form', {
                team: req.team,
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
    }

};