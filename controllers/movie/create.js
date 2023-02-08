const { error, initializeFirestore, toDateString } = require('../../functions');

module.exports = async (req, res) => {
  const {
    title,
    content,
    releaseDate,
    genre,
    duration,
    director,
    averagePrice,
    cast,
  } = req.body;
  const { username } = req.user;
  if (
    !releaseDate ||
    !genre ||
    !duration ||
    !director ||
    !averagePrice ||
    !cast ||
    !content ||
    !title ||
    !username
  ) {
    throw error(404, 'Missing required params');
  }

  if (duration < 0) {
    throw error(
      500,
      'Failed to create movie: duration should be more than 0 minutes.'
    );
  }

  if (averagePrice < 0) {
    throw error(
      500,
      'Failed to create movie: average price should be more a positive number.'
    );
  }

  const payload = {
    author: username,
    title,
    content,
    releaseDate: toDateString(new Date(releaseDate)),
    genre,
    duration: duration,
    director,
    averagePrice: averagePrice,
    cast,
    reviews: [],
  };

  const db = initializeFirestore();
  const moviesRef = db.collection('movies');
  const response = await moviesRef.add(payload);
  if (!response.id) {
    throw error(500, 'Failed to create movie');
  }

  const data = (await response.get()).data();
  data.id = response.id;

  return res.status(200).json({ data, message: 'Movie created' });
};
