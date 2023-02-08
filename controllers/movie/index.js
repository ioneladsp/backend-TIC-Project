const create = require('./create');
const readMany = require('./read-many');
const readOne = require('./read-one');
const update = require('./update.js');
const remove = require('./remove.js');

const createReview = require('./create-review');
const readReview = require('./read-review');
const readReviews = require('./read-reviews');
const removeReview = require('./remove-review');
const updateReview = require('./update-review');

module.exports = {
  create,
  readMany,
  readOne,
  update,
  remove,
  createReview,
  readReview,
  readReviews,
  removeReview,
  updateReview,
};
