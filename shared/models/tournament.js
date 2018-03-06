const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tournament = new Schema({
    _id: { type: Schema.Types.ObjectId },
    nameTournament: String,
    date: String,
    game: String,
    cash: String,
    creatorTournament: { type: Schema.Types.ObjectId, required: true } // Создатель турнира
});

Tournament.virtual('teams', {
    ref: 'Team', // The model to use
    localField: '_id', // Find people where `localField` относительно турнира
    foreignField: 'tournaments', // is equal to `foreignField` относительно команды
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false // если один то true
});

module.exports = mongoose.model('Tournament', Tournament);