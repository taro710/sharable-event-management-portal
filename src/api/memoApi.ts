import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteField,
} from 'firebase/firestore';

import { database } from '@/firebase';
import { MemoData } from '@/hooks/useMemos';

export class MemoApi {
  eventId: string;

  constructor(eventId: string) {
    this.eventId = eventId;
  }

  async get() {
    const docRef = doc(database, this.eventId, 'memo');

    try {
      const document = await getDoc(docRef);
      const data = document?.data();
      const memoList: MemoData[] = Object.values(data || {});
      return memoList;
    } catch (error) {
      throw new Error('Error get document');
    }
  }

  // TODO: setDocの戻り値で追加後のリストが返されないか確認
  async add(newMemo: MemoData) {
    const docRef = doc(database, this.eventId, 'memo');
    try {
      await setDoc(docRef, { [newMemo.memoId]: newMemo }, { merge: true });
    } catch (e) {
      throw new Error('Error adding document');
    }
  }

  async update(updatedMemo: MemoData) {
    const docRef = doc(database, this.eventId, 'memo');
    try {
      await updateDoc(docRef, { [updatedMemo.memoId]: updatedMemo });
    } catch (e) {
      throw new Error('Error adding document');
    }
  }

  async delete(memoId: number) {
    const docRef = doc(database, this.eventId, 'memo');
    try {
      await updateDoc(docRef, { [memoId]: deleteField() });
    } catch (e) {
      throw new Error('Error adding document');
    }
  }
}
