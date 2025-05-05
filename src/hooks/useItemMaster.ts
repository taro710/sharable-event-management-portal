import { useMemo } from 'react';
import useSWR from 'swr';

import { ItemMasterApi } from '@/api/itemMasterApi';

export const useItemMaster = (eventId: string) => {
  const itemMasterApi = useMemo(() => new ItemMasterApi(eventId), [eventId]);

  const { data: itemMasters = [], mutate: mutateItemMaster } = useSWR<string[]>(
    'itemMaster',
    () => itemMasterApi.get(), // TODO:
  );

  const updateItemMaster = async (updatedItemMaster: string[]) => {
    await itemMasterApi.update(updatedItemMaster);
    mutateItemMaster(updatedItemMaster, false); // optimistic UI update
  };

  return {
    itemMasters,
    updateItemMaster,
  };
};
