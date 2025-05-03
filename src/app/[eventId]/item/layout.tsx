import { doc, getDoc } from 'firebase/firestore';

import ItemPageWrapper from '@/components/containers/item/ItemPageWrapper';
import { database } from '@/firebase';
import { ItemData } from '@/hooks/pages/useItemPage';

const PageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { eventId: string };
}) => {
  const { eventId } = params;
  // TODO: 外部定義
  const getItems = async () => {
    const docRef = doc(database, eventId, 'item');

    try {
      const document = await getDoc(docRef);
      const data: ItemData[] = document?.data()?.itemData || [];
      return data;
    } catch (error) {
      throw new Error('Error get document');
    }
  };

  return <ItemPageWrapper items={await getItems()}>{children}</ItemPageWrapper>;
};

export default PageLayout;
