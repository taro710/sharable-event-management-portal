import { getDoc, doc, collection, setDoc } from 'firebase/firestore';

import { database } from '@/firebase';

export class ItemMasterApi {
  eventId: string;

  constructor(eventId: string) {
    this.eventId = eventId;
  }

  async get() {
    const docRef = doc(database, this.eventId, 'itemMaster');

    try {
      const document = await getDoc(docRef);
      const data: string[] = document?.data()?.itemData || [];
      return data;
    } catch (error) {
      throw new Error('Error get document');
    }
  }

  async update(updatedItemMasters: string[]) {
    const payload = { itemData: updatedItemMasters };
    const itemRef = collection(database, this.eventId);
    try {
      await setDoc(doc(itemRef, 'itemMaster'), payload);
    } catch (e) {
      throw new Error('Error adding document');
    }
  }
}
