import { getDoc, doc, collection, setDoc } from 'firebase/firestore';

import { database } from '@/firebase';
import { ItemData } from '@/hooks/pages/useItemPage';

export class ItemApi {
  eventId: string;

  constructor(eventId: string) {
    this.eventId = eventId;
  }

  async get() {
    const docRef = doc(database, this.eventId, 'item');

    try {
      const document = await getDoc(docRef);
      const data: ItemData[] = document?.data()?.itemData || [];
      return data;
    } catch (error) {
      throw new Error('Error get document');
    }
  }

  async update(updatedItems: ItemData[]) {
    const itemRef = collection(database, this.eventId);
    try {
      const payload = { itemData: updatedItems };
      await setDoc(doc(itemRef, 'item'), payload);
      return updatedItems;
    } catch (e) {
      throw new Error('Error adding document');
    }
  }
}
