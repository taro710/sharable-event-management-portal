import { doc, getDoc } from 'firebase/firestore';

import ExpensePageWrapper from '@/components/containers/expense/ExpensePageWrapper';
import { ExpenseData } from '@/domain/expense';
import { database } from '@/firebase';

const PageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { eventId: string };
}) => {
  const { eventId } = params;
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

  return (
    <ExpensePageWrapper expenses={await getExpenses()}>
      {children}
    </ExpensePageWrapper>
  );
};

export default PageLayout;
