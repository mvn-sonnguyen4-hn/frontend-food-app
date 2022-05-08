import { db, storage } from '@app/api/firebase';
import { COLLECTION_DB_CHAT } from '@app/constants/db.constants';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);
};

export const uploadImage = async (file: File) => {
  const imageRef = ref(storage, 'images/');
  const snapshot = await uploadBytes(imageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  if (url) {
    return url;
  }
  return null;
};

export const addMessage = async (
  id: string,
  sender_id: string,
  receiver_id: string,
  message: string
) => {
  console.log('12321');
  try {
    await setDoc(doc(db, COLLECTION_DB_CHAT, id), {
      sender_id,
      receiver_id,
      content: message,
      created_at: Timestamp.now(),
      status: 0
    });
  } catch (error) {
    console.log(error);
  }
};
