const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Team = new Schema({
    _id: { type: Schema.Types.ObjectId },
    name: String,
    game: String,
    url: String,
}, {
    versionKey: false // You should be aware of the outcome after set to false (add field '__v' )
});

Team.virtual('players', {
    ref: 'Player', // The model to use
    localField: '_id', // Find people where `localField` относительно команды
    foreignField: 'team_id', // is equal to `foreignField` относительно игрока
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false // если один то true
});

module.exports = mongoose.model('Team', Team);
