const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id, reviewId } = req.params;
  if (!id) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const moviesRef = db.collection('movies').doc(id);
  const doc = await moviesRef.get();
  if (!doc.exists) {
    throw error(404, 'Movie not found');
  }
  const { reviews } = doc.data();
  const review = reviews.find((review) => review.id === reviewId);
  if (!review) {
    throw error(404, 'Review not found');
  }

  return res.status(200).json(review);
};
