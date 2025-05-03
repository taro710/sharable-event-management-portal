import { doc, getDoc } from 'firebase/firestore';
import { NextPage } from 'next';

import ExpensePageContent from '@/components/containers/expense/ExpensePageContent';
import { ExpenseData } from '@/domain/expense';
import { database } from '@/firebase';

type Props = {
  params: {
    eventId: string;
  };
};

const DashBoard: NextPage<Props> = async ({ params: { eventId } }: Props) => {
  // TODO: 外部定義
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

  return <ExpensePageContent expenses={await getExpenses()} />;
};

export default DashBoard;
