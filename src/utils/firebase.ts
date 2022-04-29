import { db } from '@app/api/firebase';
import {
  collection,
  getDocs,
  query,
  onSnapshot,
  doc
} from 'firebase/firestore';

export async function getDBFirebase(collection_name: string) {
  const dataCol = query(collection(db, collection_name));
  const dataSnapshot = await getDocs(dataCol);
  const dataList = dataSnapshot.docs.map(doc => doc.data());
  return dataList;
}

export const unsub = onSnapshot(
  doc(db, 'messages', 'SF'),
  { includeMetadataChanges: true },
  doc => {
    const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
    console.log(source, ' data: ', doc.data());
  }
);
