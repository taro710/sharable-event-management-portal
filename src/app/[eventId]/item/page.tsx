import { doc, getDoc } from 'firebase/firestore';
import { NextPage } from 'next';

import ItemPageContent from '@/components/containers/item/ItemPageContent';
import { database } from '@/firebase';
import { ItemData } from '@/hooks/pages/useItemPage';

type Props = {
  params: {
    eventId: string;
  };
};

const DashBoard: NextPage<Props> = async ({ params: { eventId } }: Props) => {
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

  return <ItemPageContent items={await getItems()} />;
};

export default DashBoard;
