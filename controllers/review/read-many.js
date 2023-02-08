const { initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const db = initializeFirestore();
  const reviewsRef = db.collection('reviews');

  const snapshot = await reviewsRef.get();

  const data = snapshot.docs.map((doc) => {
    const review = doc.data();
    review.id = doc.id;
    return review;
  });

  return res.status(200).json(data);
};
