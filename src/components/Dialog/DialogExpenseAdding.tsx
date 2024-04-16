'use client';

import DialogWrapper from '@/components/Dialog/DialogWrapper';
import ExpenseAddingContainer from '@/components/containers/ExpenseAddingContainer';

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
