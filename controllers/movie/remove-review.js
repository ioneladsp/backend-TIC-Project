const { error, initializeFirestore } = require('../../functions');

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
    throw error(400, 'Not allowed to remove review');
  }

  await reviewsRef.delete();
  const index = reviews.findIndex((review) => review.id === reviewId);
  reviews.splice(index, 1);
  await moviesRef.update(movie);

  return res.status(200).json({ data: movie, message: 'Review updated' });
};
