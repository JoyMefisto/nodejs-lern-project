const { article: Article  } = require('../../models');
const { ObjectID } = require('mongodb');

module.exports = {
    findOne(req, res, next, news_id) {
        Article.findById( news_id ).then(article => {
            req.article = article;
            next();
        }).catch(next);
    },
    showPageCreateNews(req, res, next) {
        res.render('news/form', { article: new Article() });
    },
    createArticle(req, res, next) {
        console.log(req.body);
        Article.create({
            _id: ObjectID(Date.now()),
            author: req.body.author,
            description: req.body.description,
            preview: req.body.preview
        })
            .then(() => res.redirect(`/admin/news`))
            .catch(next);
    },
    showPageUpdateNews(req, res, next) {
        res.render('news/form', {
            article: req.article
        });
    },
    updateArticle(req, res, next) {
        Article.findByIdAndUpdate(req.body.id, req.body)
            .then(article => res.redirect(`/admin/news`))
            .catch(next);
    },
    showPageDeleteNews(req, res, next) {
        res.render('news/delete', {
            article: req.article
        });
    },
    deleteArticle(req, res, next) {
        req.article.remove()
            .then(() => res.redirect(`/admin/news`))
            .catch(next);
    },
    renderNews(req, res, next) {
        let baseUrl = '/admin/news';
        Article.find({}).then(articles => res.render('news/news', {newsList: articles, baseUrl: baseUrl}) ).catch(next);
    },

    renderArticle(req, res) {
        res.render('news/article', { article: req.article });
    }
};