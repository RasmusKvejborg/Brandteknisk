import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCma3fC_90Qit0qXi8MYX3argHglBPWs2c",
  authDomain: "brandteknisk.firebaseapp.com",
  projectId: "brandteknisk",
  storageBucket: "brandteknisk.appspot.com",
  messagingSenderId: "746458576376",
  appId: "1:746458576376:web:146f9e2d9dca5fc5f9120d",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
