// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// besquare email
// const firebaseConfig = {
//   apiKey: "AIzaSyCSEQrb5wtXmqprVlTN2XLrZhCfXBheqg8",
//   authDomain: "error-404-b49fe.firebaseapp.com",
//   projectId: "error-404-b49fe",
//   storageBucket: "error-404-b49fe.appspot.com",
//   messagingSenderId: "402017081148",
//   appId: "1:402017081148:web:6fe317ccc8825307e93039",
//   measurementId: "G-4N6D392C27",
// };

//personal email
const firebaseConfig = {
  apiKey: "AIzaSyBT-FZ6C2YwifGTmUvL1gySdf0yfGNIwl8",
  authDomain: "coinwatch-e02d0.firebaseapp.com",
  projectId: "coinwatch-e02d0",
  storageBucket: "coinwatch-e02d0.appspot.com",
  messagingSenderId: "1044711695206",
  appId: "1:1044711695206:web:c844ce85ac97c8dbb65ea7",
  measurementId: "G-9HY7BGBS7J",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
