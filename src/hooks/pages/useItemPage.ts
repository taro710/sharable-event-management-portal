import { collection, setDoc, getDoc, doc } from 'firebase/firestore';
import { useParams } from 'next/navigation';

import { database } from '@/firebase';

export type Data = {
  name: string;
  item: string[];
};

// const basUrl = process.env.NEXT_PUBLIC_FE_BASE_URL;

export const useItemPage = () => {
  const eventId = useParams()?.eventId as string;
  // const getBringList = async () => {
  //   const res = await fetch(`${basUrl}/api/api`);
  //   return res.json();
  // };

  const getItemList = async () => {
    const docRef = doc(database, eventId, 'item');

    try {
      const document = await getDoc(docRef);
      const data: Data[] = document?.data()?.itemData || [];
      return data;
    } catch (error) {
      console.error('Error get document: ', error);
    }
  };

  const updateItem = async (data: Data[]) => {
    const payload = { itemData: data };
    const itemRef = collection(database, eventId);
    try {
      await setDoc(doc(itemRef, 'item'), payload);
      return data;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const updateItemMaster = async (data: string[]) => {
    const payload = { itemData: data };
    const itemRef = collection(database, eventId);
    try {
      await setDoc(doc(itemRef, 'itemMaster'), payload);
      return data;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getItemMaster = async () => {
    const docRef = doc(database, eventId, 'itemMaster');

    try {
      const document = await getDoc(docRef);
      const data: string[] = document?.data()?.itemData || [];
      return data;
    } catch (error) {
      console.error('Error get document: ', error);
    }
  };

  return {
    updateItem,
    getItemList,
    updateItemMaster,
    getItemMaster,
  };
};
