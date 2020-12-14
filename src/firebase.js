import firebase from "firebase";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY4XE--uZJJaYkoTSscv-jd9ZuHjqLXOU",
  authDomain: "image-upload-and-log.firebaseapp.com",
  projectId: "image-upload-and-log",
  storageBucket: "image-upload-and-log.appspot.com",
  messagingSenderId: "965950137256",
  appId: "1:965950137256:web:899323a6d351b2ce1f739d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const storage = firebase.storage();
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { db, auth, storage, firebase as default };
