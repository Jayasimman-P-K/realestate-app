// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-estate-1cb38.firebaseapp.com",
  projectId: "mern-estate-1cb38",
  storageBucket: "mern-estate-1cb38.appspot.com",
  messagingSenderId: "539061600861",
  appId: "1:539061600861:web:c583fb29e7fbda6e6203b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
