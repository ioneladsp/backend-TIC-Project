const { Router } = require('express');
const { Review } = require('../controllers');

const router = Router();

router.post('/admin/reviews', Review.create);
router.get('/reviews', Review.readMany);
router.get('/reviews/:id', Review.readOne);
router.get('/admin/reviewsFilter', Review.readManyFilter);
router.put('/admin/reviews/:id', Review.update);
router.delete('/admin/reviews/:id', Review.remove);

module.exports = router;
