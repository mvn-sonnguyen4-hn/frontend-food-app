import { db } from '@app/api/firebase';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface Props {
  field: string;
  listener_name?: string;
  listener_value?: string;
  dependent?: any;
}

const useFirebase = ({
  field,
  listener_name,
  listener_value,
  dependent
}: Props) => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    if (!listener_name || !listener_value) {
      setData(null);
    } else {
      const q =
        listener_name && listener_value
          ? query(
              collection(db, field),
              orderBy('created_at', 'asc'),
              where(listener_name, '==', listener_value)
            )
          : collection(db, field);
      const unsubscribe = onSnapshot(q, docs => {
        setData(docs.docs.map(item => item.data()));
      });
      return () => {
        unsubscribe();
      };
    }
  }, [dependent]);
  return data;
};

export default useFirebase;
