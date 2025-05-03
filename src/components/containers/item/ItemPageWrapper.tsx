'use client';

import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { itemAtom } from '@/atoms/itemAtom';
import { ItemData } from '@/hooks/pages/useItemPage';

type Props = {
  items: ItemData[];
  children: React.ReactNode;
};

const ItemPageWrapper = ({ items, children }: Props) => {
  const setItems = useSetAtom(itemAtom);
  useEffect(() => setItems(items));

  return children;
};

export default ItemPageWrapper;
