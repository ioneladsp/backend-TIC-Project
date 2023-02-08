const create = require('./create');
const readMany = require('./read-many');
const readOne = require('./read-one');
const update = require('./update');
const remove = require('./remove');
const readManyFilter = require('./read-many-filter');

module.exports = {
  create,
  readMany,
  readOne,
  readManyFilter,
  update,
  remove,
};
