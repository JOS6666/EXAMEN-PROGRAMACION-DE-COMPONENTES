import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUR59Nzuj2jxadF2EH0EfcHOJq1OsU6EI",
  authDomain: "jrcs-examen.firebaseapp.com",
  projectId: "jrcs-examen",
  storageBucket: "jrcs-examen.firebasestorage.app",
  messagingSenderId: "617679522866",
  appId: "1:617679522866:web:2aa2f6d48b2db1dce9c02b",
  measurementId: "G-QWEC4TK2BP",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
