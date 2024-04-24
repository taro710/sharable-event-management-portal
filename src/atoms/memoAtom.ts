import { atom } from 'jotai';

import { MemoData } from '@/hooks/pages/useMemoPage';

export const memoAtom = atom<MemoData[]>([]);
