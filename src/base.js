import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAwv9qVBnB3i2KH8tj3_rjTr1BIzp2cXV0",
  authDomain: "memoji-f3aec.firebaseapp.com",
  databaseURL: "https://memoji-f3aec.firebaseio.com",
});

const db = firebaseApp.database();
const base = Rebase.createClass(db);

export {firebaseApp};

export default base;
