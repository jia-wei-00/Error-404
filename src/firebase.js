// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSEQrb5wtXmqprVlTN2XLrZhCfXBheqg8",
  authDomain: "error-404-b49fe.firebaseapp.com",
  projectId: "error-404-b49fe",
  storageBucket: "error-404-b49fe.appspot.com",
  messagingSenderId: "402017081148",
  appId: "1:402017081148:web:6fe317ccc8825307e93039",
  measurementId: "G-4N6D392C27",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
