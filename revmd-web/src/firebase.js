import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAot884O1C2l5AxIlpt7sXj8D_dCARRigg",
  authDomain: "raileirevlogin.firebaseapp.com",
  projectId: "raileirevlogin",
  storageBucket: "raileirevlogin.firebasestorage.app",
  messagingSenderId: "370687881673",
  appId: "1:370687881673:web:658bb9d25646ebd746b818",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
