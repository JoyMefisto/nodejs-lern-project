const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = new Schema({
    author: String,
    description: String,
    preview: String
});

module.exports = mongoose.model('Game', Game);