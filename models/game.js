const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = new Schema({
    name: String,
    game: String,
    url: String
});

module.exports = mongoose.model('Game', Game);