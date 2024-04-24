import { atom } from 'jotai';

import { ExpenseData } from '@/domain/expense';

export const expenseAtom = atom<ExpenseData[]>([]);
