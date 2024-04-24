import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { v4 } from 'uuid';

import { eventAtom } from '@/atoms/eventAtom';
import { EventData } from '@/domain/event';
import { database } from '@/firebase';

export const useEvent = (eventId?: string) => {
  const [, setEvent] = useAtom(eventAtom);

  const addEvent = async (data: EventData) => {
    const newEventId = v4();

    const docRef = doc(database, newEventId, 'event');
    try {
      await setDoc(docRef, data);
      setEvent(data);
      return newEventId;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const updateEvent = async (data: EventData) => {
    if (!eventId) return;
    const docRef = doc(database, eventId, 'event');
    try {
      await updateDoc(docRef, data);
      setEvent(data);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getEvent = async () => {
    if (!eventId) return;
    const docRef = doc(database, eventId, 'event');

    try {
      const document = await getDoc(docRef);
      const eventData = document?.data() as EventData | undefined;
      return eventData;
    } catch (error) {
      console.error('Error get document: ', error);
    }
  };

  return {
    addEvent,
    updateEvent,
    getEvent,
  };
};
