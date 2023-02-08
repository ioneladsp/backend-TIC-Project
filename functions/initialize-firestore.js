const serviceAccount = require('../firebase/key/proiect-tic-ionela-firebase-adminsdk-xyc0y-45c014f366.json');
const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp, cert } = require('firebase-admin/app');

initializeApp({
  credential: cert(serviceAccount),
});

let firestoreService;
const initializeFirestore = () => {
  if (!firestoreService) {
    firestoreService = getFirestore();
  }
  return firestoreService;
};

module.exports = initializeFirestore;
