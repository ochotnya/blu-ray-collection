// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIDhw_iGrpvGBQ-SFHK-ELzt1D-4bUw7A",
  authDomain: "my-blurays.firebaseapp.com",
  projectId: "my-blurays",
  storageBucket: "my-blurays.appspot.com",
  messagingSenderId: "182977241769",
  appId: "1:182977241769:web:900b2cbc07ebcef4e83fb8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default app;
export { db };
