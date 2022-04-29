import { db } from '@app/api/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface Props {
  field: string;
  listener_name?: string;
  listener_value?: string;
}

const useFirebase = ({ field, listener_name, listener_value }: Props) => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const q =
    listener_name && listener_value
        ? query(collection(db, field), where(listener_name, '==', listener_value))
        : collection(db, field);
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

