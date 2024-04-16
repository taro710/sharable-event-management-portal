'use client';

import ExpenseAddingContainer from '@/components/containers/expense/ExpenseAddingContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  handleSubmit: () => void;
};
const DialogExpenseAdding = ({ isOpen, closeDialog, handleSubmit }: Props) => {
  return (
    <DialogWrapper isOpen={isOpen} closeDialog={closeDialog}>
      <ExpenseAddingContainer close={closeDialog} handleSubmit={handleSubmit} />
    </DialogWrapper>
  );
};

export default DialogExpenseAdding;
