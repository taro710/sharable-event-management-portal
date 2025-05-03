import { getDoc, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

import { database } from '@/firebase';
import { ItemData } from '@/hooks/pages/useItemPage';

const getBringList = async () => {
  const docRef = doc(database, 'event01', 'bringList');

  try {
    const document = await getDoc(docRef);
    const data: ItemData[] = document?.data()?.itemData || [];
    return data;
  } catch (error) {
    throw new Error('Error get document');
  }
};

export const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const result = await getBringList();
  res.status(200).json(result);
};

export default handler;
