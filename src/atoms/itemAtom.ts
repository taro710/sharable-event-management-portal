import { atom } from 'jotai';

import { ItemData } from '@/hooks/pages/useItemPage';

export const itemMasterAtom = atom<string[]>([]);

export const itemAtom = atom<ItemData[]>([]);
