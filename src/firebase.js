import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAwTsHPdszkqEaeh7aaeTeCtxYbjIHxFR4",
    authDomain: "message-me-60d56.firebaseapp.com",
    projectId: "message-me-60d56",
    storageBucket: "message-me-60d56.appspot.com",
    messagingSenderId: "330728640393",
    appId: "1:330728640393:web:24ae66974ca27d0c02db58",
    measurementId: "G-2B2P1ZN94M"
});

const db = firebaseApp.firestore();

export default db;