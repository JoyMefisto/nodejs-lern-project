const { game: Game, team: Team, player: Player, tournament: Tournament } = require('../../../shared/models');
// const { ObjectID } = require('mongodb');

module.exports = {
    setParamGame(req, res, next, game) { // /:game
        req.game = game;
        next();
    },
    setParamTeamId(req, res, next, team_id) { // /:game/team/:team_id
        Team.findById(team_id)
            .populate('players')
            .then(team => {
                req.team = team;
                req.players = team.players;
            next();
        }).catch(next);

    },
    setParamPlayerId(req, res, next, player_id) { // /:game/players/:player_id
        req.player_id = player_id;
        next();
    },
    setParamTournamentId(req, res, next, tournament_id) { // /:game/tournaments/:tournament_id
        Tournament.findById(tournament_id)
            .populate('teams')
            .then(tournament => {
                req.tournament = tournament;
                req.teams = tournament.teams;
                next();
            }).catch(next);
    },
    // GET /:game
    showGame(req, res, next) {
        Game.findOne({ game: req.game}).then(game => {
            console.log(game);
            if(game === null) return next('Нет такой игры!');
            res.render('game', game)
        }).catch(next);
    },
    // GET /:game/teams
    showListTeams(req, res) {
        let baseUrl = `/${req.game}/teams`;
        Team.find({ game: req.game }).then(teams => res.render('teams/teams', {teams: teams, baseUrl: baseUrl, game: req.game}))
    },
    // showPageCreateTeam(req, res, next) {
    //     Game.find({}).then(games => {
    //         res.render('teams/form', { team: new Team(), game: req.game, games: games });
    //     });
    // },
    // createTeam(req, res, next) {
    //     console.log(req.body);
    //     Team.create({
    //         _id: ObjectID(Date.now()),
    //         name: req.body.name,
    //         game: req.body.game
    //     })
    //         .then(() => res.redirect(`/${req.game}/teams`))
    //         .catch(next);
    // },
    // showPageUpdateTeam(req, res, next) {
    //     Game.find({}).then(games => {
    //
    //         res.render('teams/form', {
    //             team: req.team,
    //             game: req.game,
    //             games: games
    //         });
    //     });
    //
    // },
    // updateTeam(req, res, next) {
    //     Team.findByIdAndUpdate(req.body.id, req.body)
    //         .then(team => res.redirect(`/${req.game}/teams`))
    //         .catch(next);
    // },
    // showPageDeleteTeam(req, res, next) {
    //     res.render('teams/delete', {
    //         team: req.team,
    //         game: req.game
    //     });
    // },
    // deleteTeam(req, res, next) {
    //     req.team.remove()
    //         .then(() => res.redirect(`/${req.game}/teams`))
    //         .catch(next);
    // },
    // GET /:game/teams/:team_id
    showOneTeam(req, res) {
        res.render('teams/team', { oneTeam: req.team, listPlayers: req.players, game: req.game })
    },
    // GET /:game/players
    showListPlayersGame(req, res, next) {
        Player.find({ game: req.game })
            .populate('team')
            .then(players => {
                res.render('players/players', { listPlayers: players, game: req.game })
            }).catch(next);
    },
    // GET /:game/players/:player_id
    showOnePlayerGame(req, res, next) {
        Player.findById(req.player_id)
            .then(player => {
                res.render('players/player', { onePlayer: player, game: req.game })
            }).catch(next)
    },
    // GET /:game/tournaments
    showListTournamentsGame(req, res, next){
        Tournament.find({ game: req.game })
            .then(tournaments => {
                res.render('tournaments/tournaments', { listTournaments: tournaments, game: req.game})
            }).catch(next)
    },
    // GET /:game/tournaments/:tournament_id
    showOneTournamentGame(req, res){
        res.render('tournaments/tournament', { oneTournament: req.tournament, listTeams: req.teams, game: req.game })
    }
};
