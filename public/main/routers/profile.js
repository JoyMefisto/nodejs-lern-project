const router = require('express').Router();
const { team: Team } = require('../../../shared/models');

router.get('/', (req, res, next) => {
    /**
     * @codedojo - хочу получить все команды которые создал конкретный игрок,
     * они храняться в коллекции players в поле team_id - это массив, куда складываются ObjectId _id коллекции Team
     * а виртуальное свойство у модели Player называется team
     *
     * Не получилось через виртуальное свойство, пришлось делать "руками"
     * Как можно было сделать через виртуальное свойство?
     */
    // Player.findById(req.player.id)
    //     .populate('team')
    //     .then(player => {
    //     console.log(player);
    //
    //     res.render('profile/profile', {
    //         player: req.player
    //     })
    // })

    Team.find({ '_id': { $in: req.player.team_id } })
        .then(teams => {
            res.render('profile/profile', {
                player: req.player,
                teams
            })
        }).catch(next);

});

module.exports = router;