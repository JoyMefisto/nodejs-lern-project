const { team: Team, game: Game, player: Player, tournament: Tournament } = require('../../../../shared/models');
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
        res.render('profile/tournaments/tournament', { oneTournament: req.tournament, listTeams: req.tournamentTeams, game: req.game })
    },

    // GET /profile/tournaments/create
    showPageCreateTournament(req, res, next) {
        Game.find({}).then(games => {
            res.render('profile/tournaments/create', { player: req.player, tournament: new Tournament(), game: req.game, games: games });
        });
    },

    // POST /profile/tournaments/create
    createTournament(req, res, next) {
        let
            _id = ObjectID(Date.now()),
            { creatorTournament, nameTournament, game, cash, date } = req.body;
        console.log(_id, creatorTournament, nameTournament, game, cash, date);
        Tournament.create({
            _id,
            creatorTournament,
            nameTournament,
            game,
            cash,
            date
        })
            .then((tournament) => {
                res.redirect(`/profile`)
            })
            .catch(next);
    },

    // GET /profile/tournaments/:tournament_id/update
    showPageUpdateTournament(req, res, next) {
        Game.find({}).then(games => {
            res.render('profile/tournaments/update', {
                tournament: req.tournament,
                teams: req.tournamentTeams,
                game: req.game,
                games: games
            });
        });

    },
    // POST /profile/tournaments/:tournament_id/update
    updateTournament(req, res, next) {
        console.log(req.body);
        Tournament.findByIdAndUpdate(req.body.id, req.body)
            .then(team => res.redirect(`/profile`))
            .catch(next);
    },
    // GET /profile/tournaments/:tournament_id/delete
    showPageDeleteTournament(req, res, next) {
        res.render('profile/tournaments/delete', {
            tournament: req.tournament,
            game: req.game
        });
    },
    // POST /profile/tournaments/:tournament_id/delete
    deleteTournament(req, res, next) {
        req.tournament.remove()
            .then(() => res.redirect(`/profile`))
            .catch(next);
    },
    // POST /profile/tournaments/searchTournament
    searchTournament(req, res, next) {
        let regex = new RegExp(req.body.value, 'gi');
        Team.find({
            $or: [
                { nameTeam: regex }
            ]
        })
            .then(result => {
                let teams = result.map(team => {
                    return {
                        _id: team._id,
                        name: team.nameTeam
                    }
                });
                res.send(teams);
            })
            .catch(next);

    },
    addTeamInTournament(req, res, next) {
        let { tournament_id, team_id } = req.body;

        Team.update({_id: team_id}, {$addToSet: { tournaments: ObjectID(tournament_id) }}).then(team => {
            res.send(team);

        });
    },
    deleteTeamInTournament(req, res, next) {
        let { tournament_id, team_id } = req.body;

        Team.update({ _id: team_id}, {$pull: { tournaments: ObjectID(tournament_id) }}).then(team => {
            res.send(team);
        });
    }
};