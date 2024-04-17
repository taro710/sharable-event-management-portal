import { getDoc, doc, updateDoc } from 'firebase/firestore';

import { database } from '@/firebase';

export type EventData = {
  eventName: string;
  members: string[];
  meetingPlace?: string;
  startDate?: string;
  dissolutionPlace?: string;
  endDate?: string;
  message?: string;
};

export const useEvent = (eventId: string) => {
  // const addExpense = async (data: EventData) => {
  //   const newEventId = (() => {
  //     if (currentExpenseData.length === 0) return 1;
  //     const ids = currentExpenseData.map((expense) => expense.expenseId || 0);
  //     return Math.max(...ids) + 1;
  //   })();

  //   const docRef = doc(database, 'event01', 'expense');
  //   try {
  //     await updateDoc(docRef, {
  //       [newExpenseId]: { ...data, expenseId: newExpenseId },
  //     });

  //   } catch (e) {
  //     console.error('Error adding document: ', e);
  //   }
  // };

  const updateEvent = async (data: EventData) => {
    const docRef = doc(database, eventId, 'event');
    try {
      await updateDoc(docRef, data);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getEvent = async () => {
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
    // addExpense,
    updateEvent,
    getEvent,
  };
};
