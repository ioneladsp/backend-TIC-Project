/* eslint-disable no-console */
const { initializeFirestore } = require('../../functions');
const reviews = require('../resources/reviews');

exports.seed = async () => {
  try {
    console.log('Planting seeds for reviews');

    const seeds = await reviews();
    const db = initializeFirestore();
    for (const seed of seeds) {
      await db.collection('reviews').add(seed);
    }

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot add reviews');
    console.error(err);
  }
};
