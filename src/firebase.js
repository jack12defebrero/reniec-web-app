// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz_lZSVINllLruqtpbPyw_4qXbF3E7ZWk",
  authDomain: "reniec-datos.firebaseapp.com",
  projectId: "reniec-datos",
  storageBucket: "reniec-datos.appspot.com",
  messagingSenderId: "397199687278",
  appId: "1:397199687278:web:d1646f992cf9b900f1b07f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
