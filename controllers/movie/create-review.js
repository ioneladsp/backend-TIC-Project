const { error, initializeFirestore, toDateString } = require('../../functions');

module.exports = async (req, res) => {
  console.log('buna');
  console.log(res);
  const { rating, comment } = req.body;
  const { id } = req.params;
  const { username } = req.user;
  if (!rating || !comment || !id || !username) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const moviesRef = db.collection('movies').doc(id);
  const doc = await moviesRef.get();
  if (!doc.exists) {
    throw error(404, 'Movie not found');
  }
  const data = doc.data();

  const review = {
    author: username,
    rating,
    comment,
    publicationDate: toDateString(new Date()),
  };

  if (rating < 0 || rating > 5) {
    throw error(
      500,
      'Failed to create review - rating should be between 0 and 5'
    );
  }

  const reviewsRef = db.collection('reviews');
  const response = await reviewsRef.add(review);
  if (!response.id) {
    throw error(500, 'Failed to create review');
  }

  review.id = response.id;
  data.reviews.push(review);
  await moviesRef.update(data);

  return res.status(200).json(data);
};
