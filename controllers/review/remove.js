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
  const data = doc.data();
  if (data.author !== username) {
    throw error(400, 'Not allowed to remove review');
  }

  await reviewsRef.delete();

  return res.status(200).json({ data, message: 'Review removed' });
};
