const { game: Game, team: Team, player: Player, tournament: Tournament } = require('../../models');
const { ObjectID } = require('mongodb');

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
        Player.findById(player_id)
            .populate('team')
            .then(player => {
                req.player = player;
                req.team = player.team;
                next();
            }).catch(next);
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
        Game.findOne({ game: req.game}).then(game => res.render('game', game)).catch(next);
    },
    // GET /:game/teams
    showListTeams(req, res) {
        let baseUrl = `/admin/${req.game}/teams`;
        Team.find({ game: req.game }).then(teams => res.render('teams/teams', {teams: teams, baseUrl: baseUrl, game: req.game}))
    },
    showPageCreateTeam(req, res, next) {
        Game.find({}).then(games => {
            res.render('teams/form', { team: new Team(), game: req.game, games: games });
        });
    },
    createTeam(req, res, next) {
        Team.create({
            _id: ObjectID(Date.now()),
            name: req.body.name,
            game: req.body.game
        })
            .then(() => res.redirect(`/admin/${req.game}/teams`))
            .catch(next);
    },
    showPageUpdateTeam(req, res, next) {
        Game.find({}).then(games => {

            res.render('teams/form', {
                team: req.team,
                game: req.game,
                games: games
            });
        });

    },
    updateTeam(req, res, next) {
        Team.findByIdAndUpdate(req.body.id, req.body)
            .then(team => res.redirect(`/admin/${req.game}/teams`))
            .catch(next);
    },
    showPageDeleteTeam(req, res, next) {
        res.render('teams/delete', {
            team: req.team,
            game: req.game
        });
    },
    deleteTeam(req, res, next) {
        req.team.remove()
            .then(() => res.redirect(`/admin/${req.game}/teams`))
            .catch(next);
    },
    // GET /:game/teams/:team_id
    showOneTeam(req, res) {
        res.render('teams/team', { oneTeam: req.team, listPlayers: req.players, game: req.game })
    },
    // GET /:game/players
    showListPlayersGame(req, res, next) {
        let baseUrl = `/admin/${req.game}/players`;
        Player.find({ game: req.game })
            .populate('team')
            .then(players => {
                res.render('players/players', { listPlayers: players, game: req.game, baseUrl: baseUrl })
            }).catch(next);
    },
    // GET /:game/players/:player_id
    showOnePlayerGame(req, res, next) {
        Player.findById(req.player_id)
            .then(player => {
                res.render('players/player', { onePlayer: player, game: req.game })
            }).catch(next)
    },

    showPageCreatePlayer(req, res, next) {
        let games = Game.find({});
        let teams = Team.find({});

        Promise.all([games, teams]).then(result => {
            console.log(result);
            res.render('players/form', { player: new Player(), game: req.game, games: result[0], teams: result[1] });
        })
    },
    createPlayer(req, res, next) {
        console.log(req.body);
        Player.create({
            _id: ObjectID(Date.now()),
            name: req.body.name,
            game: req.body.game,
            team_id: ObjectID(req.body.team_id)
        })
            .then(() => res.redirect(`/admin/${req.game}/players`))
            .catch(next);
    },
    showPageUpdatePlayer(req, res, next) {
        // Game.find({}).then(games => {
        //
        //     res.render('players/form', {
        //         player: req.player,
        //         game: req.game,
        //         games: games
        //     });
        // });

        let games = Game.find({});
        let teams = Team.find({});

        Promise.all([games, teams]).then(result => {
            console.log(result);
            console.log(req.player);
            res.render('players/form', { player: req.player, game: req.game, games: result[0], teams: result[1] });
        })
    },
    updatePlayer(req, res, next) {
        Player.findByIdAndUpdate(req.body.id, req.body)
            .then(player => res.redirect(`/admin/${req.game}/players`))
            .catch(next);
    },
    showPageDeletePlayer(req, res, next) {
        res.render('players/delete', {
            player: req.player,
            game: req.game
        });
    },
    deletePlayer(req, res, next) {
        req.player.remove()
            .then(() => res.redirect(`/admin/${req.game}/players`))
            .catch(next);
    },

    // GET /:game/tournaments
    showListTournamentsGame(req, res, next){
        let baseUrl = `/admin/${req.game}/tournaments`;
        Tournament.find({ game: req.game })
            .then(tournaments => {
                res.render('tournaments/tournaments', { listTournaments: tournaments, game: req.game, baseUrl: baseUrl })
            }).catch(next)
    },
    // GET /:game/tournaments/:tournament_id
    showOneTournamentGame(req, res){
        res.render('tournaments/tournament', { oneTournament: req.tournament, listTeams: req.teams, game: req.game })
    },

    showPageCreateTournament(req, res, next) {
        Game.find({}).then(games => {
            res.render('tournaments/form', { tournament: new Tournament(), game: req.game, games: games });
        });
    },
    createTournament(req, res, next) {
        Tournament.create({
            _id: ObjectID(Date.now()),
            name: req.body.name,
            game: req.body.game,
            date: req.body.date,
            cash: req.body.cash
        })
            .then(() => res.redirect(`/admin/${req.game}/tournaments`))
            .catch(next);
    },
    showPageUpdateTournament(req, res, next) {
        Game.find({}).then(games => {

            res.render('tournaments/form', {
                tournament: req.tournament,
                game: req.game,
                games: games
            });
        });
    },
    updateTournament(req, res, next) {
        Tournament.findByIdAndUpdate(req.body.id, req.body)
            .then(tournament => res.redirect(`/admin/${req.game}/tournaments`))
            .catch(next);
    },
    showPageDeleteTournament(req, res, next) {
        res.render('tournaments/delete', {
            tournament: req.tournament,
            game: req.game
        });
    },
    deleteTournament(req, res, next) {
        req.tournament.remove()
            .then(() => res.redirect(`/admin/${req.game}/tournaments`))
            .catch(next);
    }
};
