const { Router } = require('express');
const router = Router();
const { news: controller } = require('../controllers');

router.param('news_id', controller.findOne);


// GET /admin/news
router.get('/', controller.renderNews);

router.route('/create')
    .get(controller.showPageCreateNews)
    .post(controller.createArticle);

router.route('/:news_id/update')
    .get(controller.showPageUpdateNews)
    .post(controller.updateArticle);

router.route('/:news_id/delete')
    .get(controller.showPageDeleteNews)
    .post(controller.deleteArticle);

// GET /admin/news/1
router.get('/:news_id', controller.renderArticle);

module.exports = router;