const { Router } = require('express');
const router = Router();
const news = require('../controllers/news');

router.param('news_id', news.findOne);

// GET /news
router.get('/', news.renderNews);

// GET /news/1
router.get('/:news_id', news.renderArticle);

module.exports = router;