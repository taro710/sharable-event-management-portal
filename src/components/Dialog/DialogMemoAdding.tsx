'use client';

import DialogWrapper from '@/components/Dialog/DialogWrapper';

import { MemoData } from '@/hooks/pages/useMemoPage';

import MemoAddingContainer from '@/components/containers/MemoAddingContainer';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: (memoData: MemoData) => void;
};
const DialogMemoAdding = ({ isOpen, setIsOpen, handleSubmit }: Props) => {
  return (
    <DialogWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <MemoAddingContainer setIsOpen={setIsOpen} handleSubmit={handleSubmit} />
    </DialogWrapper>
  );
};

export default DialogMemoAdding;
