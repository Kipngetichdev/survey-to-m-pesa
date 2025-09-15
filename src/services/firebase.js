import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPdqR1xVF0PDT38y0Onvos1k59k-qk-jc",
  authDomain: "survey-to-mpesa.firebaseapp.com",
  projectId: "survey-to-mpesa",
  storageBucket: "survey-to-mpesa.firebasestorage.app",
  messagingSenderId: "1082130764580",
  appId: "1:1082130764580:web:45bffa336bed9e6498d9b1",
  measurementId: "G-7EFV7KMJSH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, analytics };