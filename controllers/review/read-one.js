const { error, initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const reviewsRef = db.collection('reviews').doc(id);
  const doc = await reviewsRef.get();
  if (!doc.exists) {
    throw error(404, 'Review not found');
  }
  const data = doc.data();

  return res.status(200).json(data);
};
