const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Article = new Schema({
    author: String,
    description: String,
    preview: String
});

module.exports = mongoose.model('Article', Article);