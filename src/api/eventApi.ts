import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';

import { EventData } from '@/domain/event';
import { database } from '@/firebase';

export class EventApi {
  // FIXME:
  // eslint-disable-next-line class-methods-use-this
  async get(eventId: string) {
    const docRef = doc(database, eventId, 'event');

    try {
      const document = await getDoc(docRef);
      const data = document?.data();
      if (!data) throw new Error('No data');

      return { ...data, eventId } as EventData;
    } catch (error) {
      throw new Error('Error get document');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async add(addedEvent: EventData) {
    const docRef = doc(database, addedEvent.eventId, 'event');
    try {
      await setDoc(docRef, addedEvent);
    } catch (e) {
      throw new Error('Error adding document');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async update(updatedEvent: EventData) {
    const docRef = doc(database, updatedEvent.eventId, 'event');
    try {
      await updateDoc(docRef, updatedEvent);
    } catch (e) {
      throw new Error('Error updating document');
    }
  }
}
