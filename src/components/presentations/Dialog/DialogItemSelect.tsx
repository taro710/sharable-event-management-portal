'use client';

import ItemSelectContainer from '@/components/containers/item/ItemSelectContainer';
import DialogWrapper from '@/components/presentations/Dialog/DialogWrapper';
import { ItemData } from '@/hooks/pages/useItemPage';

type Props = {
  items: ItemData[];
  selectedItems?: string[];
  isOpen: boolean;
  updateItem: (data: ItemData[]) => Promise<void>;
  closeDialog: () => void;
  handleSubmit: (selectedItem: string[]) => void;
};
const emptyArray: string[] = [];

const DialogItemSelect = ({
  items,
  isOpen,
  closeDialog,
  updateItem,
  handleSubmit,
  selectedItems = emptyArray,
}: Props) => (
  <DialogWrapper closeDialog={closeDialog} isOpen={isOpen}>
    <ItemSelectContainer
      close={closeDialog}
      handleSubmit={handleSubmit}
      items={items}
      selectedItems={selectedItems}
      updateItem={updateItem}
    />
  </DialogWrapper>
);

export default DialogItemSelect;
