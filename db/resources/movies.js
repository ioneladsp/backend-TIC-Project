const chance = require('../../lib/chance');
const {
  initializeFirestore,
  randomDate,
  randomUsername,
} = require('../../functions');

module.exports = async () => {
  const db = initializeFirestore();
  const reviews = await db.collection('reviews').get();
  const reviewsData = reviews.docs.map((review) => {
    const data = review.data();
    data.id = review.id;
    return data;
  });

  return [
    {
      author: randomUsername(),
      title: chance.sentence({ words: 3 }),
      content: chance.paragraph({ sentences: 10 }),
      releaseDate: randomDate(),
      genre: chance.string(),
      duration: chance.integer({ min: 0, max: 5 }),
      director: chance.name(),
      averagePrice: chance.integer({ min: 0, max: 200 }),
      cast: chance.name(),
      reviews: [reviewsData[0]],
    },
    {
      author: randomUsername(),
      title: chance.sentence({ words: 3 }),
      content: chance.paragraph({ sentences: 10 }),
      releaseDate: randomDate(),
      genre: chance.string(),
      duration: chance.integer({ min: 0, max: 5 }),
      director: chance.name(),
      averagePrice: chance.integer({ min: 0, max: 200 }),
      cast: chance.name(),
      reviews: [reviewsData[1]],
    },
    {
      author: randomUsername(),
      title: chance.sentence({ words: 3 }),
      content: chance.paragraph({ sentences: 10 }),
      releaseDate: randomDate(),
      genre: chance.string(),
      duration: chance.integer({ min: 0, max: 5 }),
      director: chance.name(),
      averagePrice: chance.integer({ min: 0, max: 200 }),
      cast: chance.name(),
      reviews: [reviewsData[2]],
    },
  ];
};
