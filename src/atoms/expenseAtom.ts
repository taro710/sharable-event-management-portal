import { atom } from 'jotai';

import { ExpenseData } from '@/hooks/pages/useExpensePage';

export const expenseAtom = atom<ExpenseData[]>([]);
