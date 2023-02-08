const { initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const db = initializeFirestore();
  const moviesRef = db.collection('movies');
  const snapshot = await moviesRef.get();
  const data = snapshot.docs.map((doc) => {
    const movie = doc.data();
    movie.id = doc.id;
    return movie;
  });

  return res.status(200).json(data);
};
