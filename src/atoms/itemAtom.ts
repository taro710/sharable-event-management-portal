import { atom } from 'jotai';

import { Data } from '@/hooks/pages/useItemPage';

export const itemMasterAtom = atom<string[]>([]);

export const bringListAtom = atom<Data[]>([]);
