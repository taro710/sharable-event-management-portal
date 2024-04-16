'use client';

import ItemSelectContainer from '@/components/containers/item/ItemSelectContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';

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
