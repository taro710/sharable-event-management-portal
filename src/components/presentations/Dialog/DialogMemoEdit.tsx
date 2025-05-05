'use client';

import MemoEditContainer from '@/components/containers/memo/MemoEditContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';
import { MemoData } from '@/hooks/useMemos';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  memoData: MemoData;
  handleDelete: (memoId: number) => void;
  handleSubmit: (data: MemoData) => void;
};
const DialogMemoEdit = ({
  isOpen,
  closeDialog,
  memoData,
  handleDelete,
  handleSubmit,
}: Props) => (
  <DialogWrapper closeDialog={closeDialog} isOpen={isOpen}>
    <MemoEditContainer
      close={closeDialog}
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}
      memoData={memoData}
    />
  </DialogWrapper>
);

export default DialogMemoEdit;
