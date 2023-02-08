const { Router } = require('express');
const { Movie } = require('../controllers');

const router = Router();

router.post('/admin/movies', Movie.create);
router.get('/movies', Movie.readMany);
router.get('/movies/:id', Movie.readOne);
router.put('/admin/movies/:id', Movie.update);
router.delete('/admin/movies/:id', Movie.remove);

router.post('/admin/movies/:id/reviews', Movie.createReview);
router.get('/movies/:id/reviews', Movie.readReviews);
router.get('/movies/:id/reviews/:reviewId', Movie.readReview);
router.put('/admin/movies/:id/reviews/:reviewId', Movie.updateReview);
router.delete('/admin/movies/:id/reviews/:reviewId', Movie.removeReview);

module.exports = router;
