const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Player = new Schema({
    // team_id: { type: Schema.Types.ObjectId }, // №1
    name: String,
    game: String,
    url: String
});

// №2
Player.virtual('team', {
    ref: 'Team', // The model to use
    localField: 'team_id', // Find people where `localField` относительно игрока
    foreignField: '_id', // is equal to `foreignField` относительно команды
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true // если один то true
});

module.exports = mongoose.model('Player', Player);