import { collection, setDoc, getDoc, doc } from 'firebase/firestore';
import { useParams } from 'next/navigation';

import { database } from '@/firebase';

export type Data = {
  name: string;
  item: string[];
};

export const useItemPage = () => {
  const eventId = useParams()?.eventId as string;

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

  const updateItem = async (data: Data[]) => {
    const payload = { itemData: data };
    const itemRef = collection(database, eventId);
    try {
      await setDoc(doc(itemRef, 'item'), payload);
      return data;
    } catch (e) {
      throw new Error('Error adding document');
    }
  };

  const updateItemMaster = async (data: string[]) => {
    const payload = { itemData: data };
    const itemRef = collection(database, eventId);
    try {
      await setDoc(doc(itemRef, 'itemMaster'), payload);
      return data;
    } catch (e) {
      throw new Error('Error adding document');
    }
  };

  const getItemMaster = async () => {
    const docRef = doc(database, eventId, 'itemMaster');

    try {
      const document = await getDoc(docRef);
      const data: string[] = document?.data()?.itemData || [];
      return data;
    } catch (error) {
      throw new Error('Error get document');
    }
  };

  return {
    updateItem,
    getItemList,
    updateItemMaster,
    getItemMaster,
  };
};
