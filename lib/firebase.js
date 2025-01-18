// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALaw09Y0u_1VYhFELGkqxEMfTPztDXcIU",
  authDomain: "liftpulse-6745a.firebaseapp.com",
  projectId: "liftpulse-6745a",
  storageBucket: "liftpulse-6745a.firebasestorage.app",
  messagingSenderId: "1015432546558",
  appId: "1:1015432546558:web:c17d71d09414a1712efdaf",
  measurementId: "G-SMDGM27G58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);