import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAtWbaIO5r5KgD_MoM8j0Zgd_WZ7Tk2H0g",
  authDomain: "commuter-with-you.firebaseapp.com",
  projectId: "commuter-with-you",
  storageBucket: "commuter-with-you.firebasestorage.app",
  messagingSenderId: "830361047363",
  appId: "1:830361047363:web:a3af1ac8378a001a1bdff6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
