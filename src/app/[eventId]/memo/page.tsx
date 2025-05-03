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
  const getMemoList = async () => {
    const docRef = doc(database, eventId, 'memo');

    try {
      const document = await getDoc(docRef);
      const data = document?.data();
      const memoList: MemoData[] = Object.values(data || {});
      memoList.reverse();
      return memoList;
    } catch (error) {
      throw new Error('Error get document');
    }
  };

  const memos = await getMemoList();

  return <MemoPageContent memo={memos} />;
};

export default DashBoard;
