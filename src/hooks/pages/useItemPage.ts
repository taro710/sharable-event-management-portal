import { collection, setDoc, getDoc, doc } from 'firebase/firestore';

import { database } from '@/firebase';

export type Data = {
  name: string;
  bring: string[];
};

export const useItemPage = () => {
  const updateBringList = async (data: Data[]) => {
    const payload = { itemData: data };
    const itemRef = collection(database, 'event01');
    try {
      await setDoc(doc(itemRef, 'bringList'), payload);
      return data;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getBringList = async () => {
    const docRef = doc(database, 'event01', 'bringList');

    try {
      const document = await getDoc(docRef);
      const data: Data[] = document?.data()?.itemData || [];
      return data;
    } catch (error) {
      console.error('Error get document: ', error);
    }
  };

  const updateItemMaster = async (data: string[]) => {
    const payload = { itemData: data };
    const itemRef = collection(database, 'event01');
    try {
      await setDoc(doc(itemRef, 'itemMaster'), payload);
      return data;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getItemMaster = async () => {
    const docRef = doc(database, 'event01', 'itemMaster');

    try {
      const document = await getDoc(docRef);
      const data: string[] = document?.data()?.itemData || [];
      return data;
    } catch (error) {
      console.error('Error get document: ', error);
    }
  };

  return {
    updateBringList,
    getBringList,
    updateItemMaster,
    getItemMaster,
  };
};
