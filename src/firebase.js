// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDsbf8TOGjUC5AB51gJu1iPojBE_floSyo",
  authDomain: "fraudgame-d16e2.firebaseapp.com",
  projectId: "fraudgame-d16e2",
  storageBucket: "fraudgame-d16e2.firebasestorage.app",
  messagingSenderId: "67871015617",
  appId: "1:67871015617:web:8d3a9a3abf812dbcd80a40",
  measurementId: "G-575C4BK1RS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDB = getDatabase(app);
export { auth, db , realtimeDB};
