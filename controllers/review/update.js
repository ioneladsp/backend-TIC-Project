const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { username } = req.user;
  if (!id || !username) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const reviewsRef = db.collection('reviews').doc(id);
  const doc = await reviewsRef.get();
  if (!doc.exists) {
    throw error(404, 'Review not found');
  }
  if (doc.data().author !== username) {
    throw error(400, 'Not allowed to update review');
  }

  const payload = {};
  const { rating, comment } = req.body;

  if (rating) {
    payload.rating = rating;
  }

  if (rating < 0 || rating > 5) {
    throw error(
      500,
      'Failed to update review - rating should be between 0 and 5'
    );
  }

  if (comment) {
    payload.comment = comment;
  }

  await reviewsRef.update(payload);
  const data = (await reviewsRef.get()).data();

  return res.status(200).json({ data, message: 'Review updated' });
};
