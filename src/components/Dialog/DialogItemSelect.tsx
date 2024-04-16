'use client';

import DialogWrapper from '@/components/Dialog/DialogWrapper';
import ItemSelectContainer from '@/components/containers/ItemSelectContainer';

type Props = {
  selectedItems?: string[];
  isOpen: boolean;
  closeDialog: () => void;
  handleSubmit: (selectedItem: string[]) => void;
};
const DialogItemSelect = ({
  isOpen,
  closeDialog,
  handleSubmit,
  selectedItems = [],
}: Props) => {
  return (
    <DialogWrapper isOpen={isOpen} closeDialog={closeDialog}>
      <ItemSelectContainer
        close={closeDialog}
        handleSubmit={handleSubmit}
        selectedItems={selectedItems}
      />
    </DialogWrapper>
  );
};

export default DialogItemSelect;
