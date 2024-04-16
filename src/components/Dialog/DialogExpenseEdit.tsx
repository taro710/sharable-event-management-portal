'use client';

import DialogWrapper from '@/components/Dialog/DialogWrapper';
import ExpenseEditContainer from '@/components/containers/ExpenseEditContainer';

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
