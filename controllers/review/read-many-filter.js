const { initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { username } = req.user;
  if (!username) {
    throw error(404, 'Missing required params');
  }
  const db = initializeFirestore();
  const moviesRef = db.collection('movies');

  const snapshot = await moviesRef.get();

  const newReviews = [];
  snapshot.docs.forEach((doc) => {
    const movie = doc.data();
    const title = movie.title;
    const reviews = movie.reviews;
    for (const review of reviews) {
      newReviews.push({
        ...review,
        title,
      });
    }
  });

  return res.status(200).json(newReviews);
};
