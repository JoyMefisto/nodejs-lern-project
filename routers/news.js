const { Router } = require('express');
const router = Router();
const news = require('../controllers/news');

// GET /news
router.get('/', news.renderNews);

// GET /news/1
router.get('/:id', news.renderArticle);

module.exports = router;