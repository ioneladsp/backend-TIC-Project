const { error, initializeFirestore, toDateString } = require('../../functions');

module.exports = async (req, res) => {
  const { rating, comment } = req.body;
  const { username } = req.user;
  if (!rating || !comment || !username) {
    throw error(404, 'Missing required params');
  }

  const payload = {
    author: username,
    rating: rating,
    comment,
    publicationDate: toDateString(new Date()),
  };

  if (rating < 0 || rating > 5) {
    throw error(
      500,
      'Failed to create review - rating should be between 0 and 5'
    );
  }

  const db = initializeFirestore();
  const reviewsRef = db.collection('reviews');
  const response = await reviewsRef.add(payload);
  if (!response.id) {
    throw error(500, 'Failed to create review');
  }
  const data = (await response.get()).data();
  data.id = response.id;

  return res.status(200).json({ data, message: 'Review created' });
};
