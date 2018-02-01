const { article: Article  } = require('../models');

module.exports = {
    findOne(req, res, next, news_id) {
        Article.findById( news_id ).then(article => {
            req.news_id = article;
            next();
        }).catch(next);
    },
    renderNews(req, res, next) {
        Article.find({}).then(articles => res.render('news/news', {newsList: articles}) ).catch(next);
    },

    renderArticle(req, res) {
        res.render('news/article', { description: req.news_id });
    }
};