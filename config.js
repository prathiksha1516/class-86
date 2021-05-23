import firebase from 'firebase'
require('@firebase/firestore')



const firebaseConfig = {
    apiKey: "AIzaSyA70XDP8gdbiAqaOivk92NF0ZLG29E_sx8",
    authDomain: "book-santa-cab04.firebaseapp.com",
    projectId: "book-santa-cab04",
    storageBucket: "book-santa-cab04.appspot.com",
    messagingSenderId: "454446699593",
    appId: "1:454446699593:web:3c4d64ff4c00ec5e79db98"
  };
  firebase.initializeApp(firebaseConfig)
  export default firebase.firestore()
  