// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDXknnCiBvFbWZ1Ayn6b4EPIzPXd092vTM',
  authDomain: 'my-expense-tracker-app-fbb19.firebaseapp.com',
  projectId: 'my-expense-tracker-app-fbb19',
  storageBucket: 'my-expense-tracker-app-fbb19.firebasestorage.app',
  messagingSenderId: '465442994763',
  appId: '1:465442994763:web:a3c3e983dc75e3de1b2bce',
  measurementId: 'G-NS6J8FCQ1X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
