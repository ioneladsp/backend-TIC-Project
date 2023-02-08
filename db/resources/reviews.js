const chance = require('../../lib/chance');
const { randomDate, randomUsername } = require('../../functions');

module.exports = async () => {
  return [
    {
      author: randomUsername(), //username-ul este de fapt afisat ca autor
      rating: chance.integer({ min: 0, max: 5 }),
      publicationDate: randomDate(),
      comment: chance.sentence({ words: 15 }),
    },
    {
      author: randomUsername(),
      rating: chance.integer({ min: 0, max: 5 }),
      publicationDate: randomDate(),
      comment: chance.sentence({ words: 15 }),
    },
    {
      author: randomUsername(),
      rating: chance.integer({ min: 0, max: 5 }),
      publicationDate: randomDate(),
      comment: chance.sentence({ words: 15 }),
    },
  ];
};
