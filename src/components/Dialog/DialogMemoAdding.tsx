'use client';

import DialogWrapper from '@/components/Dialog/DialogWrapper';

import { MemoData } from '@/hooks/pages/useMemoPage';

import MemoAddingContainer from '@/components/containers/MemoAddingContainer';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  handleSubmit: (memoData: MemoData) => void;
};
const DialogMemoAdding = ({ isOpen, closeDialog, handleSubmit }: Props) => {
  return (
    <DialogWrapper isOpen={isOpen} closeDialog={closeDialog}>
      <MemoAddingContainer handleSubmit={handleSubmit} close={closeDialog} />
    </DialogWrapper>
  );
};

export default DialogMemoAdding;
