const { Router } = require('express');
const {
  authenticate,
  error,
  errorHandler,
  loading,
  notFound,
} = require('./middleware');
const { identity, movie, review } = require('./routes');

const router = Router();

router.all('/admin', authenticate);
router.all('/admin/*', authenticate);

router.use(loading);
router.use(error);

router.use(identity);
router.use(movie);
router.use(review);

router.all('*', notFound);

router.use(errorHandler);

module.exports = router;
