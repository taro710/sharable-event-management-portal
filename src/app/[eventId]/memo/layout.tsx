import { doc, getDoc } from 'firebase/firestore';

import MemoPageWrapper from '@/components/containers/memo/MemoPageWrapper';
import { database } from '@/firebase';
import { MemoData } from '@/hooks/pages/useMemoPage';

const PageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { eventId: string };
}) => {
  const { eventId } = params;
  // TODO: 外部定義
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

  return <MemoPageWrapper memos={await getMemos()}>{children}</MemoPageWrapper>;
};

export default PageLayout;
