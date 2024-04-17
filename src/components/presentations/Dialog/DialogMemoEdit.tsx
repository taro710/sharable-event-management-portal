'use client';

import MemoEditContainer from '@/components/containers/memo/MemoEditContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';
import { MemoData } from '@/hooks/pages/useMemoPage';

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
}: Props) => {
  return (
    <DialogWrapper isOpen={isOpen} closeDialog={closeDialog}>
      <MemoEditContainer
        memoData={memoData}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        close={closeDialog}
      />
    </DialogWrapper>
  );
};

export default DialogMemoEdit;
