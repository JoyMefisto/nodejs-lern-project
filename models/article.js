const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Article = new Schema({
    _id: { type: Schema.Types.ObjectId },
    title: String,
    author: String,
    description: String,
    preview: String
}, {
    versionKey: false // You should be aware of the outcome after set to false (add field '__v' )
});

module.exports = mongoose.model('Article', Article);