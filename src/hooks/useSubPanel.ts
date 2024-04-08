import { collection, setDoc, doc, getDoc } from 'firebase/firestore';

import { database } from '@/firebase';

export type EventData = {
  eventName: string;
  members: string[];
  startDate?: string;
  endDate?: string;
  meetingPlace?: string;
  dissolutionPlace?: string;
  message?: string;
};

export const useSubPanel = () => {
  const updateEvent = async (data: EventData) => {
    const payload: EventData = data;
    const eventRef = collection(database, 'event01');
    try {
      await setDoc(doc(eventRef, 'event'), payload);
      return payload;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getEvent = async () => {
    const docRef = doc(database, 'event01', 'event');

    try {
      const document = await getDoc(docRef);
      return document?.data();
    } catch (error) {
      console.error('Error get document: ', error);
    }
  };

  return {
    getEvent,
    updateEvent,
  };
};
