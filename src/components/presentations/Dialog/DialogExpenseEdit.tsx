'use client';

import ExpenseEditContainer from '@/components/containers/expense/ExpenseEditContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  handleSubmit: () => void;
};
const DialogExpenseEdit = ({ isOpen, closeDialog, handleSubmit }: Props) => {
  return (
    <DialogWrapper isOpen={isOpen} closeDialog={closeDialog}>
      <ExpenseEditContainer close={closeDialog} handleSubmit={handleSubmit} />
    </DialogWrapper>
  );
};

export default DialogExpenseEdit;
