const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Team = new Schema({
    name: String,
    game: String,
    url: String,
    // players_id: [{ type: Schema.Types.ObjectId, ref: 'Player' }] // №1
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

module.exports = mongoose.model('Team', Team);
