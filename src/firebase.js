// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/database";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  databaseURL:
    "https://chat-50044-default-rtdb.europe-west1.firebasedatabase.app/",
  apiKey: "AIzaSyBARKwZokihTl6_hUnqPWYbda1Zi0MLRH0",
  authDomain: "chat-50044.firebaseapp.com",
  projectId: "chat-50044",
  storageBucket: "chat-50044.appspot.com",
  //   messagingSenderId: "807197648450",
  //   appId: "1:807197648450:web:725ccf273a8ea571ffefdb",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
export default database;
