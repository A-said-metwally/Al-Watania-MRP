// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDpYFevMvAL7xq7ueWhqbSqtZVstUKkOgc",
  authDomain: "watania-kpis.firebaseapp.com",
  projectId: "watania-kpis",
  storageBucket: "watania-kpis.appspot.com",
  messagingSenderId: "359695121277",
  appId: "1:359695121277:web:1dc4d5916fcafa961d6a14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)