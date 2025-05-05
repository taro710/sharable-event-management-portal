import { useMemo } from 'react';
import useSWR from 'swr';

import { ItemApi } from '@/hooks/pages/itemApi';

export type ItemData = {
  name: string;
  item: string[];
};

export const useItemPage = (eventId: string) => {
  const itemApi = useMemo(() => new ItemApi(eventId), [eventId]);

  const { data: items = [], mutate: mutateItem } = useSWR<ItemData[]>(
    'item',
    () => itemApi.get(), // TODO:
  );

  const updateItem = async (updatedItems: ItemData[]) => {
    await itemApi.update(updatedItems);
    mutateItem(updatedItems, false); // optimistic UI update
  };

  return {
    items,
    updateItem,
  };
};
