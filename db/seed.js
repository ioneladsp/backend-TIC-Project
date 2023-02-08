const movies = require('./seeds/002_movies');
const identities = require('./seeds/001_identities');
const reviews = require('./seeds/003_reviews');

const seed = async () => {
  await identities.seed();
  await reviews.seed();
  await movies.seed();
};

(async () => {
  try {
    await seed();
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

module.exports = seed;
