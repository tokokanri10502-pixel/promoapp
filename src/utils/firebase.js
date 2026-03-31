import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD6_8O53aTmk45RwnImVvI0xdAucNhaFOA",
  authDomain: "promo-plan-269ed.firebaseapp.com",
  projectId: "promo-plan-269ed",
  storageBucket: "promo-plan-269ed.firebasestorage.app",
  messagingSenderId: "812500257620",
  appId: "1:812500257620:web:e185a20acc295b0c0656c1",
  measurementId: "G-P43TPXT1GV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
