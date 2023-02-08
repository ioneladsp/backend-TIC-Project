/* eslint-disable no-console */
const { initializeFirestore } = require('../../functions');
const movies = require('../resources/movies');

exports.seed = async () => {
  try {
    console.log('Planting seeds for movies');

    const seeds = await movies();
    const db = initializeFirestore();
    for (const seed of seeds) {
      await db.collection('movies').add(seed);
    }

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot add movies');
    console.error(err);
  }
};
