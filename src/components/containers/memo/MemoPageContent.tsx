import { doc, getDoc } from 'firebase/firestore';

import MemoPageContentClient from '@/components/containers/memo/MemoPageContentClient';
import { database } from '@/firebase';
import { MemoData } from '@/hooks/pages/useMemoPage';

type Props = {
  eventId: string;
};

const MemoPageContent = async ({ eventId }: Props) => {
  if (!eventId) return null; // TODO: ページ直アクセス直後にeventIdがundefined状態になるのを解消する

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

  return <MemoPageContentClient memo={memos} />;
};

export default MemoPageContent;
