import { doc, getDoc } from 'firebase/firestore';
import { NextPage } from 'next';

import MemoPageContent from '@/components/containers/memo/MemoPageContent';
import { database } from '@/firebase';
import { MemoData } from '@/hooks/pages/useMemoPage';

type Props = {
  params: {
    eventId: string;
  };
};

const DashBoard: NextPage<Props> = async ({ params: { eventId } }: Props) => {
  const getMemos = async () => {
    const docRef = doc(database, eventId, 'memo');

    try {
      const document = await getDoc(docRef);
      const data = document?.data();
      const memos: MemoData[] = Object.values(data || {});
      memos.reverse();
      return memos;
    } catch (error) {
      throw new Error('Error get document');
    }
  };

  return <MemoPageContent memos={await getMemos()} />;
};

export default DashBoard;
