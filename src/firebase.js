import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAFTFpIjj7KneynwtYfSLFQi6kp53tH1NI",
  authDomain: "agenda-idealante.firebaseapp.com",
  databaseURL: "https://agenda-idealante.firebaseio.com",
  projectId: "agenda-idealante",
  storageBucket: "agenda-idealante.appspot.com",
  messagingSenderId: "589949223376",
  appId: "1:589949223376:web:604aba23d3e178f49879d5",
});

export { firebaseConfig as firebase };
