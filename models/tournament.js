const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tournament = new Schema({
    name: String,
    data: String,
    game: String,
    cash: String,
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }] // №1
});

// №2
// Tournament.virtual('teams', {
//     ref: 'Team', // The model to use
//     localField: '_id', // Find people where `localField` относительно команды
//     foreignField: 'teams', // is equal to `foreignField` относительно турнира
//     // If `justOne` is true, 'members' will be a single doc as opposed to
//     // an array. `justOne` is false by default.
//     justOne: false // если один то true
// });

module.exports = mongoose.model('Tournament', Tournament);