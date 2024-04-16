'use client';

import DialogWrapper from '@/components/Dialog/DialogWrapper';
import MemoEditContainer from '@/components/containers/MemoEditContainer';
import { MemoData } from '@/hooks/pages/useMemoPage';

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
