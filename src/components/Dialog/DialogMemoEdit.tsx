'use client';

import DialogWrapper from '@/components/Dialog/DialogWrapper';
import { MemoData } from '@/hooks/pages/useMemoPage';
import MemoEditContainer from '@/components/containers/MemoEditContainer';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  memoData: MemoData;
  handleSubmit: (data: MemoData) => void;
};
const DialogMemoEdit = ({
  isOpen,
  closeDialog,
  memoData,
  handleSubmit,
}: Props) => {
  return (
    <DialogWrapper isOpen={isOpen} closeDialog={closeDialog}>
      <MemoEditContainer
        memoData={memoData}
        handleSubmit={handleSubmit}
        close={closeDialog}
      />
    </DialogWrapper>
  );
};

export default DialogMemoEdit;
