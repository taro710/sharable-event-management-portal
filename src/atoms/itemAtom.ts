import { atom } from 'jotai';

import { Data } from '@/hooks/pages/useItemPage';

export const itemAtom = atom<string[]>([]);

export const bringListAtom = atom<Data[]>([]);
