'use client';

import ExpenseAddingContainer from '@/components/containers/expense/ExpenseAddingContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';
import { ExpenseDataWithoutId } from '@/domain/expense';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  handleSubmit: (expense: ExpenseDataWithoutId) => void;
};
const DialogExpenseAdding = ({ isOpen, closeDialog, handleSubmit }: Props) => (
  <DialogWrapper closeDialog={closeDialog} isOpen={isOpen}>
    <ExpenseAddingContainer close={closeDialog} handleSubmit={handleSubmit} />
  </DialogWrapper>
);

export default DialogExpenseAdding;
