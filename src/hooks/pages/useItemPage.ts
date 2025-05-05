import { collection, setDoc, getDoc, doc } from 'firebase/firestore';
import { useMemo } from 'react';
import useSWR from 'swr';

import { database } from '@/firebase';
import { ItemApi } from '@/hooks/pages/itemApi';

export type ItemData = {
  name: string;
  item: string[];
};

export const useItemPage = (eventId: string) => {
  const itemApi = useMemo(() => new ItemApi(eventId), [eventId]);

  const { data: items = [], mutate } = useSWR<ItemData[]>(
    'item',
    () => itemApi.get(), // TODO:
  );

  const updateItem = async (updatedItems: ItemData[]) => {
    await itemApi.update(updatedItems);
    mutate(updatedItems, false); // optimistic UI update
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
    items,
    updateItem,
    updateItemMaster,
    getItemMaster,
  };
};
