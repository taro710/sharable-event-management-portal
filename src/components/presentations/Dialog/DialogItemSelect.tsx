'use client';

import ItemSelectContainer from '@/components/containers/item/ItemSelectContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';
import { ItemData } from '@/hooks/pages/useItemPage';

type Props = {
  selectedItems?: string[];
  isOpen: boolean;
  updateItem: (data: ItemData[]) => Promise<void>;
  updateItemMaster: (data: string[]) => Promise<string[] | undefined>;
  closeDialog: () => void;
  handleSubmit: (selectedItem: string[]) => void;
};
const emptyArray: string[] = [];

const DialogItemSelect = ({
  isOpen,
  closeDialog,
  updateItem,
  updateItemMaster,
  handleSubmit,
  selectedItems = emptyArray,
}: Props) => (
  <DialogWrapper closeDialog={closeDialog} isOpen={isOpen}>
    <ItemSelectContainer
      close={closeDialog}
      handleSubmit={handleSubmit}
      selectedItems={selectedItems}
      updateItem={updateItem}
      updateItemMaster={updateItemMaster}
    />
  </DialogWrapper>
);

export default DialogItemSelect;
