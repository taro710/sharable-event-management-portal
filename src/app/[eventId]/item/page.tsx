import { doc, getDoc } from 'firebase/firestore';
import { NextPage } from 'next';

import ItemPageContent from '@/components/containers/item/ItemPageContent';
import { database } from '@/firebase';
import { Data } from '@/hooks/pages/useItemPage';

type Props = {
  params: {
    eventId: string;
  };
};

const DashBoard: NextPage<Props> = async ({ params: { eventId } }: Props) => {
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

  return <ItemPageContent itemList={items} />;
};

export default DashBoard;
