import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const COL = 'promoPlans';

export async function loadPlanData(year, month) {
  const docRef = doc(db, COL, `${year}_${month}`);
  const snap = await getDoc(docRef);
  return snap.exists() ? snap.data() : null;
}

export async function savePlanData(year, month, data) {
  const docRef = doc(db, COL, `${year}_${month}`);
  await setDoc(docRef, data);
}
