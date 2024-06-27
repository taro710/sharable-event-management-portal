'use client';

import ExpenseEditContainer from '@/components/containers/expense/ExpenseEditContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';
import { ExpenseData } from '@/domain/expense';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  defaultExpense: ExpenseData;
  deleteExpense: (expenseId?: number) => void;
  handleSubmit: (expense: ExpenseData) => void;
};
const DialogExpenseEdit = ({
  isOpen,
  closeDialog,
  defaultExpense,
  deleteExpense,
  handleSubmit,
}: Props) => (
    <DialogWrapper closeDialog={closeDialog} isOpen={isOpen}>
      <ExpenseEditContainer
        close={closeDialog}
        defaultExpense={defaultExpense}
        deleteExpense={deleteExpense}
        handleSubmit={handleSubmit}
      />
    </DialogWrapper>
  );

export default DialogExpenseEdit;
