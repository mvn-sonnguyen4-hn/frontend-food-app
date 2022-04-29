import { db } from '@app/api/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useFirebase = (props: string) => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const q = query(collection(db, props), where('sender_id', '==', '1'));
    const unsubscribe = onSnapshot(q, docs => {
      setData(docs.docs.map(item => item.data()));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return data;
};

export default useFirebase;
