'use client';

import MemoAddingContainer from '@/components/containers/memo/MemoAddingContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';
import { MemoData } from '@/hooks/pages/useMemoPage';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  handleSubmit: (memoData: Omit<MemoData, 'memoId'>) => void;
};
const DialogMemoAdding = ({ isOpen, closeDialog, handleSubmit }: Props) => (
    <DialogWrapper closeDialog={closeDialog} isOpen={isOpen}>
      <MemoAddingContainer close={closeDialog} handleSubmit={handleSubmit} />
    </DialogWrapper>
  );

export default DialogMemoAdding;
