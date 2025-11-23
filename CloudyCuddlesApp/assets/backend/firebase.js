// Simple Firebase configuration - without AsyncStorage first
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhkkENsTRrPBiysShcqddC1ceW3R2jHWA",
  authDomain: "cloudycuddles-df23d.firebaseapp.com",
  projectId: "cloudycuddles-df23d",
  storageBucket: "cloudycuddles-df23d.firebasestorage.app",
  messagingSenderId: "631631769528",
  appId: "1:631631769528:web:ee6d6cae584ece8b32a94d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore (Simple version)
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };