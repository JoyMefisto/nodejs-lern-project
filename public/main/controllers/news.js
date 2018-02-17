const { article: Article  } = require('../../../shared/models');

module.exports = {
    findOne(req, res, next, news_id) {
        Article.findById( news_id ).then(article => {
            req.article = article;
            next();
        }).catch(next);
    },
    renderNews(req, res, next) {
        let baseUrl = '/news';
        Article.find({}).then(articles => res.render('news/news', {newsList: articles, baseUrl: baseUrl}) ).catch(next);
    },

    renderArticle(req, res) {
        res.render('news/article', { article: req.article });
    }
};