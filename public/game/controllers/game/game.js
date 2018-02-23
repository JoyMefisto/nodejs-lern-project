const { game: Game, team: Team, player: Player, tournament: Tournament } = require('../../../../shared/models');
// const { ObjectID } = require('mongodb');

module.exports = {

    // GET /:game
    showGame(req, res, next) {
        Game.findOne({ game: req.game}).then(game => {
            if(game === undefined) return next('Нет такой игры!');
            res.render('game', game)
        }).catch(next);
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
            .then(() => res.redirect(`/${req.game}/teams`))
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
            .then(team => res.redirect(`/${req.game}/teams`))
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
            .then(() => res.redirect(`/${req.game}/teams`))
            .catch(next);
    }

};
