import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBUcssRmnyo_xZrTh6NL_LigXrlI4QMkWk",
    authDomain: "the-gym-manager-1ddeb.firebaseapp.com",
    projectId: "the-gym-manager-1ddeb",
    storageBucket: "the-gym-manager-1ddeb.appspot.com",
    messagingSenderId: "164706224385",
    appId: "1:164706224385:web:6087530788c14392487300",
    databaseURL: "https://the-gym-manager-1ddeb-default-rtdb.firebaseio.com"
  };

  export const firebaseApp = initializeApp(firebaseConfig)

  
  
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp)
  export {auth, db}
