import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "carries-firebase.firebaseapp.com",
  projectId: "carries-firebase",
  storageBucket: "carries-firebase.firebasestorage.app",
  messagingSenderId: "334313397977",
  appId: "1:334313397977:web:a2c3beee4c55f11ccaa8c8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
