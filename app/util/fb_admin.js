// import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./fb_config";
// firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const realtimeDB = getDatabase(app);

// const firestore = firebase.firestore();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// export const auth = firebase.aut;
// export const googleProvider = new firebase.auth.GoogleAuthProvider()e

export const rdb = realtimeDB;
export default db;

// export default firestore;
