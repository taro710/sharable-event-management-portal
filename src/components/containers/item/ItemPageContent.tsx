import { doc, getDoc } from 'firebase/firestore';

import ItemPageContentClient from '@/components/containers/item/ItemPageContentClient';
import { database } from '@/firebase';
import { Data } from '@/hooks/pages/useItemPage';

type Props = {
  eventId: string;
};

const ItemPageContent = async ({ eventId }: Props) => {
  if (!eventId) return null; // TODO: ページ直アクセス直後にeventIdがundefined状態になるのを解消する

  const getItemList = async () => {
    const docRef = doc(database, eventId, 'item');

    try {
      const document = await getDoc(docRef);
      const data: Data[] = document?.data()?.itemData || [];
      return data;
    } catch (error) {
      throw new Error('Error get document');
    }
  };

  const items = await getItemList();

  return <ItemPageContentClient itemList={items} />;
};

export default ItemPageContent;
