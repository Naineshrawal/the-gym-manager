import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

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
  export const imageDb = getStorage(firebaseApp)
  // export const storage = getStorage(firebaseApp, "gs://the-gym-manager-1ddeb.appspot.com")
  
  
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp)
  // const storageRef = ref(storage)
  // const imgRef = ref(storage, 'images')
  export {auth, db}
