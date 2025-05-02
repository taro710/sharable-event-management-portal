import { doc, getDoc } from 'firebase/firestore';

import ExpensePageContentClient from '@/components/containers/expense/ExpensePageContentClient';
import { ExpenseData } from '@/domain/expense';
import { database } from '@/firebase';

type Props = {
  eventId: string;
};

const ExpensePageContent = async ({ eventId }: Props) => {
  if (!eventId) return null; // TODO: ページ直アクセス直後にeventIdがundefined状態になるのを解消する

  const getExpenses = async () => {
    const docRef = doc(database, eventId, 'expense');
    try {
      const document = await getDoc(docRef);
      const data = document?.data();
      const expenseList: ExpenseData[] = Object.values(data || {});
      expenseList.reverse();
      return expenseList;
    } catch (error) {
      throw new Error('Error get document');
    }
  };

  return <ExpensePageContentClient expenses={await getExpenses()} />;
};

export default ExpensePageContent;
