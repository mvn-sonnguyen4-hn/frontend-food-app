import { Timestamp } from 'firebase/firestore';

export enum enumToastify {
  error = 'error',
  success = 'success'
}

export interface CustomSelectProps {
  value?: number | string;
  title: string;
}

export interface MessageDef {
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: Timestamp;
}
