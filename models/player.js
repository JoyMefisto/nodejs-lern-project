const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Player = new Schema({
    team_id: Number,
    name: String,
    game: String,
    url: String
});

module.exports = mongoose.model('Player', Player);