import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ⚠️ YOUR FIREBASE CONFIGURATION GOES HERE
const firebaseConfig = {
  apiKey: "AIzaSyB8ntZl824kWnH-Xtq9ZHDbQvMqPNGtXDc",
  authDomain: "dorek-international-3ef93.firebaseapp.com",
  projectId: "dorek-international-3ef93",
  storageBucket: "dorek-international-3ef93.firebasestorage.app",
  messagingSenderId: "911540014",
  appId: "1:911540014:web:1a4fed269836252e9944bf",
  measurementId: "G-41GTSBZP9Q"
};

let app, auth, db, storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.error("Firebase initialization failed. Please check your config in src/firebase.js", error);
}

export { auth, db, storage };
