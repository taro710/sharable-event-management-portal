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
}: Props) => {
  return (
    <DialogWrapper isOpen={isOpen} closeDialog={closeDialog}>
      <ExpenseEditContainer
        close={closeDialog}
        handleSubmit={handleSubmit}
        deleteExpense={deleteExpense}
        defaultExpense={defaultExpense}
      />
    </DialogWrapper>
  );
};

export default DialogExpenseEdit;
