'use client';

import ItemSelectContainer from '@/components/containers/item/ItemSelectContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';
import { Data } from '@/hooks/pages/useItemPage';

type Props = {
  selectedItems?: string[];
  isOpen: boolean;
  updateItem: (data: Data[]) => Promise<Data[] | undefined>;
  updateItemMaster: (data: string[]) => void;
  closeDialog: () => void;
  handleSubmit: (selectedItem: string[]) => void;
};
const DialogItemSelect = ({
  isOpen,
  closeDialog,
  updateItem,
  updateItemMaster,
  handleSubmit,
  selectedItems = [],
}: Props) => {
  return (
    <DialogWrapper isOpen={isOpen} closeDialog={closeDialog}>
      <ItemSelectContainer
        close={closeDialog}
        updateItem={updateItem}
        updateItemMaster={updateItemMaster}
        handleSubmit={handleSubmit}
        selectedItems={selectedItems}
      />
    </DialogWrapper>
  );
};

export default DialogItemSelect;
