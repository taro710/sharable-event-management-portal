import { doc, getDoc } from 'firebase/firestore';
import { headers } from 'next/headers';

import Wrapper from '@/app/[eventId]/Wrapper';
import { EventData } from '@/domain/event';
import { ExpenseData } from '@/domain/expense';
import { database } from '@/firebase';
import { Data } from '@/hooks/pages/useItemPage';
import { MemoData } from '@/hooks/pages/useMemoPage';

const PageLayout = async ({ children }: { children: React.ReactNode }) => {
  const pathname = headers().get('x-pathname') || '';
  const eventId = pathname.split('/')[1]; //TODO: この位置にeventIdが来ない場合もある

  // TODO: hooksから抜く
  const getEvent = async () => {
    if (!eventId) return;
    const docRef = doc(database, eventId, 'event');

    try {
      const document = await getDoc(docRef);
      const eventData = document?.data() as EventData | undefined;
      return eventData;
    } catch (error) {
      console.error('Error get document: ', error);
    }
  };

  const getItemList = async () => {
    const docRef = doc(database, eventId, 'item');

    try {
      const document = await getDoc(docRef);
      const data: Data[] = document?.data()?.itemData || [];
      return data;
    } catch (error) {
      console.error('Error get document: ', error);
    }
  };

  const getExpenseList = async () => {
    const docRef = doc(database, eventId, 'expense');

    try {
      const document = await getDoc(docRef);
      const data = document?.data();
      const expenseList: ExpenseData[] = Object.values(data || {});
      expenseList.reverse();
      return expenseList;
    } catch (error) {
      console.error('Error get document: ', error);
    }
  };

  const getMemoList = async () => {
    const docRef = doc(database, eventId, 'memo');

    try {
      const document = await getDoc(docRef);
      const data = document?.data();
      const memoList: MemoData[] = Object.values(data || {});
      memoList.reverse();
      return memoList;
    } catch (error) {
      console.error('Error get document: ', error);
    }
  };

  return (
    <Wrapper
      event={await getEvent()}
      itemList={await getItemList()}
      expense={await getExpenseList()}
      memo={await getMemoList()}>
      {children}
    </Wrapper>
  );
};

export default PageLayout;
