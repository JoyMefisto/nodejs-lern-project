const newsList = require('../data/news');

module.exports = {
    renderNews(req, res) {
        res.render('news', {news: newsList});
    },

    renderArticle(req, res) {
        let news = newsList.find( news => news.id == req.params.id);
        res.render('news_article', {description: news});
    }
}