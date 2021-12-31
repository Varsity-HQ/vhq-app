// import React from "react";
import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./fb_config";
// firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const firestore = firebase.firestore();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// export const auth = firebase.aut;
// export const googleProvider = new firebase.auth.GoogleAuthProvider()e

export default db;

// export const fb = firebase;

// export default firestore;
