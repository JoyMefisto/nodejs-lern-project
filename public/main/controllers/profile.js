const { team: Team, game: Game, player: Player } = require('../../../shared/models');
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
        Game.find({}).then(games => {
            res.render('profile/profile', {
                player: req.player,
                teams: req.teams,
                myTeams: req.myTeams,
                games
            })
        })

    },
    showMyTeams(req, res, next) {
        res.render('profile/teams/teams', {
            player: req.player,
            teams: req.teams,
            myTeams: req.myTeams
        })
    },
    // GET /profile/teams/:team_id
    showOneTeam(req, res) {
        console.log('player',req.player);
        console.log('myTeams', req.myTeams);
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
            res.render('profile/teams/edit', {
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
    updateGameList(req, res, next){
        Player.findByIdAndUpdate(req.body.id, req.body)
              .then(player => res.redirect('/profile') )
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

    searchPlayer(req, res, next) {
        let regex = new RegExp(req.body.player, 'gi');

        Player.find({
                $or: [
                    { email: regex },
                    { name: regex }
                ]
            })
            .then(result => {
                let players = result.map(player => {
                    return {
                        id: player._id,
                        name: player.name,
                        email: player.email,
                    }
                });

                console.log(players);
                res.send(players);
            })
            .catch(next);

    }

};