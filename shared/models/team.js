const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Team = new Schema({
    _id: { type: Schema.Types.ObjectId },
    nameTeam: { type: String, unique: true, sparse: true }, // Имя команды
    listGameTeam: [{ type: Schema.Types.String, default: '' }], // Игры, в которых учавствует команда
    creatorTeam: { type: Schema.Types.ObjectId, required: true } // Создатель команды
    // url: { type: Schema.Types.String, default: '' }
});

Team.virtual('players', {
    ref: 'Player', // The model to use
    localField: '_id', // Find people where `localField` относительно команды
    foreignField: 'teams', // is equal to `foreignField` относительно игрока
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false // если один то true
});

module.exports = mongoose.model('Team', Team);
