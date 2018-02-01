const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Team = new Schema({
    team_id: Number,
    name: String,
    game: String,
    url: String
});

module.exports = mongoose.model('Team', Team);