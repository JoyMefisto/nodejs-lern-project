const { team: Team, game: Game, player: Player } = require('../../../../shared/models');
const { ObjectID } = require('mongodb');

module.exports = {
    showMyTournaments(req, res, next) {
        res.render('profile/tournaments/tournaments', {
            player: req.player,
            teams: req.teams,
            myTournaments: req.myTournaments
        })
    },
    // GET /profile/tournaments/:tournament_id
    showOneTournament(req, res) {
        console.log('showOneTournament', req.tournamentTeams);
        res.render('profile/tournaments/tournament', { oneTournament: req.tournament, listTeams: req.tournamentTeams, game: req.game })
    },

    // GET /profile/tournaments/create
    showPageCreateTournament(req, res, next) {
        Game.find({}).then(games => {
            res.render('profile/tournaments/create', { player: req.player, team: new Team(), game: req.game, games: games });
        });
    },

    // POST /profile/tournaments/create
    createTournament(req, res, next) {
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

    // GET /profile/tournaments/:tournament_id/update
    showPageUpdateTournament(req, res, next) {
        Game.find({}).then(games => {
            res.render('profile/tournaments/update', {
                team: req.team,
                players: req.players,
                game: req.game,
                games: games
            });
        });

    },
    // POST /profile/tournaments/:tournament_id/update
    updateTournament(req, res, next) {
        Team.findByIdAndUpdate(req.body.id, req.body)
            .then(team => res.redirect(`/profile`))
            .catch(next);
    },
    // GET /profile/tournaments/:tournament_id/delete
    showPageDeleteTournament(req, res, next) {
        res.render('profile/tournaments/delete', {
            team: req.team,
            game: req.game
        });
    },
    // POST /profile/tournaments/:tournament_id/delete
    deleteTournament(req, res, next) {
        req.team.remove()
            .then(() => res.redirect(`/profile`))
            .catch(next);
    },

};