const { error, initializeFirestore, toDateString } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { username } = req.user;
  if (!id || !username) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const moviesRef = db.collection('movies').doc(id);
  const doc = await moviesRef.get();
  if (!doc.exists) {
    throw error(404, 'Movie not found');
  }
  if (doc.data().author !== username) {
    throw error(400, 'Not allowed to update movie');
  }
  const payload = {};
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

  if (title) {
    payload.title = title;
  }
  if (content) {
    payload.content = content;
  }
  if (releaseDate) {
    payload.releaseDate = toDateString(new Date(releaseDate));
  }
  if (genre) {
    payload.genre = genre;
  }
  if (duration) {
    payload.duration = duration;
  }

  if (duration < 0) {
    throw error(
      500,
      'Failed to update movie - duration should be more than 0 minutes'
    );
  }

  if (director) {
    payload.director = director;
  }
  if (averagePrice) {
    payload.averagePrice = averagePrice;
  }

  if (averagePrice < 0) {
    throw error(
      500,
      'Failed to update movie - average price should be a positive number'
    );
  }
  if (cast) {
    payload.cast = cast;
  }

  await moviesRef.update(payload);
  const data = (await moviesRef.get()).data();

  return res.status(200).json({ data, message: 'Movie updated' });
};
