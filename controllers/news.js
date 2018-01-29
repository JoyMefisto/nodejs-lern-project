const newsList = require('../data/news');

module.exports = {
    renderNews(req, res) {
        res.render('news/news', {newsList: newsList});
    },

    renderArticle(req, res) {
        let news = newsList.find( news => news.id == req.params.news_id);
        res.render('news/article', {description: news});
    }
}