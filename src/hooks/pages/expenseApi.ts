import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteField,
} from 'firebase/firestore';

import { ExpenseData } from '@/domain/expense';
import { database } from '@/firebase';

export class ExpenseApi {
  eventId: string;

  constructor(eventId: string) {
    this.eventId = eventId;
  }

  async get() {
    const docRef = doc(database, this.eventId, 'expense');
    try {
      const document = await getDoc(docRef);
      const data = document?.data();
      const expenseList: ExpenseData[] = Object.values(data || {});
      expenseList.reverse();
      return expenseList;
    } catch (error) {
      throw new Error('Error get document');
    }
  }

  // TODO: setDocの戻り値で追加後のリストが返されないか確認
  async add(newExpense: ExpenseData) {
    const docRef = doc(database, this.eventId, 'expense');
    try {
      await setDoc(docRef, newExpense, { merge: true });
    } catch (e) {
      throw new Error('Error adding document');
    }
  }

  async update(updatedExpense: ExpenseData) {
    const docRef = doc(database, this.eventId, 'expense');
    try {
      if (!updatedExpense.expenseId) throw new Error('invalid expenseId');
      await updateDoc(docRef, { [updatedExpense.expenseId]: updatedExpense });
    } catch (e) {
      throw new Error('Error adding document');
    }
  }

  async delete(expenseId: number) {
    const docRef = doc(database, this.eventId, 'expense');
    try {
      await updateDoc(docRef, { [expenseId]: deleteField() });
    } catch (e) {
      throw new Error('Error adding document');
    }
  }
}
