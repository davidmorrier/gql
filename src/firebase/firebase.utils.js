import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAES3MyvgeJb6qBhWfVatEu86j5HyEE6Rs",
  authDomain: "crwn-db-988fb.firebaseapp.com",
  databaseURL: "https://crwn-db-988fb.firebaseio.com",
  projectId: "crwn-db-988fb",
  storageBucket: "crwn-db-988fb.appspot.com",
  messagingSenderId: "257651998514",
  appId: "1:257651998514:web:3d1c2327a598e29f7d612b",
  measurementId: "G-0B77B24253",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
