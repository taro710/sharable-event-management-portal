import { doc, getDoc } from 'firebase/firestore';
import { headers } from 'next/headers';

import Meta from '@/components/Meta';
import ClientLayout from '@/components/containers/ClientLayout';
import { EventData } from '@/domain/event';
import { database } from '@/firebase';

const PageLayout = async ({ children }: { children: React.ReactNode }) => {
  const pathname = headers().get('x-pathname') || '';
  const [, eventId] = pathname.split('/'); //TODO: この位置にeventIdが来ない場合もある

  // TODO: 外部定義
  const getEvent = async (): Promise<EventData> => {
    if (!eventId) throw new Error('No eventId');
    const docRef = doc(database, eventId, 'event');

    try {
      const document = await getDoc(docRef);
      const data = document?.data();
      if (!data) throw new Error('No data');

      const eventData = data as EventData;
      return { ...eventData, eventId };
    } catch (error) {
      throw new Error('Error get document');
    }
  };

  // const getMemoList = async () => {
  //   const docRef = doc(database, eventId, 'memo');

  //   try {
  //     const document = await getDoc(docRef);
  //     const data = document?.data();
  //     const memoList: MemoData[] = Object.values(data || {});
  //     memoList.reverse();
  //     return memoList;
  //   } catch (error) {
  //     throw new Error('Error get document');
  //   }
  // };

  const event = await getEvent();

  return (
    <>
      <Meta event={event} />
      <ClientLayout event={event}>{children}</ClientLayout>
    </>
  );
};

export default PageLayout;
