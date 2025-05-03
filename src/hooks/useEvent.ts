import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { v4 } from 'uuid';

import { eventAtom } from '@/atoms/eventAtom';
import { EventData } from '@/domain/event';
import { database } from '@/firebase';

// TODO: eventId必須化
export const useEvent = (eventId?: string) => {
  const [, setEvent] = useAtom(eventAtom);

  const addEvent = async (data: EventData) => {
    const newEventId = v4();

    const docRef = doc(database, newEventId, 'event');
    try {
      await setDoc(docRef, data);
      setEvent({ ...data, eventId: newEventId });
      return newEventId;
    } catch (e) {
      throw new Error('Error adding document');
    }
  };

  const updateEvent = async (data: EventData) => {
    if (!eventId) return;
    const docRef = doc(database, eventId, 'event');
    try {
      await updateDoc(docRef, data);
      setEvent({ ...data, eventId });
    } catch (e) {
      throw new Error('Error updating document');
    }
  };

  return {
    addEvent,
    updateEvent,
  };
};
