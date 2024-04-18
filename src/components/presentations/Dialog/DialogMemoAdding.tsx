'use client';

import MemoAddingContainer from '@/components/containers/memo/MemoAddingContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';
import { MemoData } from '@/hooks/pages/useMemoPage';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  handleSubmit: (memoData: Omit<MemoData, 'memoId'>) => void;
};
const DialogMemoAdding = ({ isOpen, closeDialog, handleSubmit }: Props) => {
  return (
    <DialogWrapper isOpen={isOpen} closeDialog={closeDialog}>
      <MemoAddingContainer handleSubmit={handleSubmit} close={closeDialog} />
    </DialogWrapper>
  );
};

export default DialogMemoAdding;
