import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// var firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDZ2H_ABltKg9NNHPP8Sdr0TJXlCILQLFw",
  authDomain: "image-upload-3718a.firebaseapp.com",
  databaseURL: "gs://image-upload-3718a.appspot.com/",
  projectId: "image-upload-3718a",
  storageBucket: "image-upload-3718a.appspot.com",
  messagingSenderId: "1094883365158",
  appId: "1:1094883365158:web:19abf2ba7042e55ad9b1e7",
  measurementId: "G-7ZLZCMQHDN"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore();
