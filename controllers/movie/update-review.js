const { error, initializeFirestore, toDateString } = require('../../functions');

module.exports = async (req, res) => {
  const { id, reviewId } = req.params;
  const { username } = req.user;
  if (!id || !reviewId || !username) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const moviesRef = db.collection('movies').doc(id);
  let doc = await moviesRef.get();
  if (!doc.exists) {
    throw error(404, 'Movie not found');
  }
  const movie = doc.data();
  const { reviews } = movie;
  const review = reviews.find((review) => review.id === reviewId);
  const reviewsRef = db.collection('reviews').doc(reviewId);
  doc = await reviewsRef.get();
  if (!review || !doc.exists) {
    throw error(404, 'Review not found');
  }
  if (review.author !== username || doc.data().author !== username) {
    throw error(400, 'Not allowed to update review');
  }

  review.publicationDate = toDateString(new Date());
  const { rating, comment } = req.body;
  if (rating) {
    review.rating = rating;
  }

  if (rating < 0 || rating > 5) {
    throw error(
      500,
      'Failed to update review - rating should be between 0 and 5'
    );
  }

  if (comment) {
    review.comment = comment;
  }

  await reviewsRef.update(review);
  await moviesRef.update(movie);

  return res.status(200).json({ data: movie, message: 'Review updated' });
};
