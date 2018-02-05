const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Team = new Schema({
    _id: { type: Schema.Types.ObjectId },
    name: String,
    game: String,
    url: String,
    // players_id: [{ type: Schema.Types.ObjectId, ref: 'Player' }] // №1
    //games: [{ type: Schema.Types.String, ref: 'Game' }] //todo: @codedojo хочу положить сюда все объекты из коллекции games
});

// №2
Team.virtual('players', {
    ref: 'Player', // The model to use
    localField: '_id', // Find people where `localField` относительно команды
    foreignField: 'team_id', // is equal to `foreignField` относительно игрока
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false // если один то true
});

// Team.virtual('games', {
//     ref: 'Game', // The model to use
//     localField: 'game', // Find people where `localField` относительно команды
//     foreignField: 'game', // is equal to `foreignField` относительно игрока
//     // If `justOne` is true, 'members' will be a single doc as opposed to
//     // an array. `justOne` is false by default.
//     justOne: false // если один то true
// });

module.exports = mongoose.model('Team', Team);
