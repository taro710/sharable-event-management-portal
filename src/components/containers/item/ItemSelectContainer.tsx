'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import style from './ItemSelectContainer.module.scss';

import Button from '@/components/presentations/Common/Button/Button';
import DialogWrapperMini from '@/components/presentations/Dialog/DialogWrapperMini';
import Input from '@/components/presentations/Form/Input/Input';
import TagCheckbox from '@/components/presentations/Form/TagCheckbox/TagCheckbox';
import IconArrow from '@/components/presentations/Icon/IconArrow';
import IconClose from '@/components/presentations/Icon/IconClose';
import IconEdit from '@/components/presentations/Icon/IconEdit';
import IconRemove from '@/components/presentations/Icon/IconRemove';
import { ItemData } from '@/hooks/useItem';
import { useItemMaster } from '@/hooks/useItemMaster';
import { useResponsive } from '@/hooks/useResponsive';

type Props = {
  items: ItemData[];
  selectedItems: string[] | undefined;
  updateItem: (data: ItemData[]) => Promise<void>;
  handleSubmit: (selectedItem: string[]) => void;
  close: () => void;
};

const emptyArray: string[] = [];

const ItemSelectContainer = ({
  items,
  selectedItems = emptyArray,
  updateItem,
  handleSubmit,
  close,
}: Props) => {
  const { isSp } = useResponsive();

  const eventId = useParams()?.eventId as string;
  const { itemMasters, updateItemMaster } = useItemMaster(eventId);

  const [selectedItem, setSelectedItem] = useState<string[]>(selectedItems);
  const [value, setValue] = useState<string>('');
  const updateSelectedItem = useCallback((_selectedItem: string) => {
    setSelectedItem((prev) => {
      if (prev.includes(_selectedItem))
        return prev.filter((elm) => elm !== _selectedItem);
      return [...prev, _selectedItem];
    });
  }, []);
  const addValue = useCallback(async () => {
    if (value === '') return;
    if (itemMasters.includes(value)) return;
    await updateItemMaster([...itemMasters, value]);
    updateSelectedItem(value);
    setValue('');
  }, [itemMasters, updateItemMaster, updateSelectedItem, value]);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [tmpItem, setTmpItem] = useState<string[]>(itemMasters);
  useEffect(() => setTmpItem(itemMasters), [itemMasters]);

  const [removedItem, setRemovedItem] = useState<string[]>([]);
  const [isOpenNoticePanel, setIsOpenNoticePanel] = useState<boolean>(false);

  const handleCloseNoticePanel = () => {
    setTmpItem(itemMasters);
    setIsEditMode(false);
    setRemovedItem([]);
    setIsOpenNoticePanel(false);
  };

  const handleSubmitNoticePanel = useCallback(async () => {
    const newItemMaster = tmpItem;
    if (newItemMaster === undefined) return;
    await updateItemMaster(newItemMaster);

    const newItems = items.map((elm) => {
      return {
        name: elm.name,
        item: elm.item.filter((item) => tmpItem.includes(item)),
      };
    });
    await updateItem(newItems);
    setSelectedItem((prev) =>
      prev.filter((item) => newItemMaster.includes(item)),
    );
    setIsEditMode(false);
    setIsOpenNoticePanel(false);
  }, [items, tmpItem, updateItem, updateItemMaster]);

  return (
    <>
      <div
        className={clsx(
          style['dialog-content'],
          isOpenNoticePanel && style['-disabled'],
        )}>
        <div className={style.header}>
          <button
            className={style.icon}
            type="button"
            onClick={() => {
              setSelectedItem(selectedItems);
              close();
            }}>
            {isSp ? <IconArrow /> : <IconClose />}
          </button>
        </div>
        <div className={style.body}>
          <div className={style.buttons}>
            {isEditMode ? null : (
              <>
                {itemMasters.map((item) => (
                  // FIXME: key
                  <div className={style.item} key={item}>
                    <TagCheckbox
                      checked={selectedItem.includes(item)}
                      label={item}
                      onClick={() => updateSelectedItem(item)}
                    />
                  </div>
                ))}
                {itemMasters.length > 0 ? (
                  <div
                    className={style.icon}
                    onClick={() => setIsEditMode(true)}>
                    <IconEdit />
                  </div>
                ) : null}
              </>
            )}
            {isEditMode ? (
              <>
                {tmpItem.map((item) => (
                  // FIXME: key
                  <div className={style.item} key={item}>
                    <TagCheckbox defaultChecked={false} label={item} />
                    <div
                      className={style.icon}
                      onClick={() => {
                        const remainItem = tmpItem.filter(
                          (elm) => elm !== item,
                        );
                        setTmpItem(remainItem);
                        setRemovedItem((prev) => [...prev, item]);
                      }}>
                      <IconRemove />
                    </div>
                  </div>
                ))}
              </>
            ) : null}
          </div>
          {isEditMode ? (
            <div className={style.action}>
              <Button
                text="確定"
                width={80}
                onClick={() => {
                  if (removedItem.length === 0) {
                    setIsEditMode(false);
                    return;
                  }
                  setIsOpenNoticePanel(true);
                }}
              />
              <Button
                text="キャンセル"
                theme="secondary"
                width={80}
                onClick={() => {
                  setTmpItem(itemMasters);
                  setIsEditMode(false);
                  setRemovedItem([]);
                }}
              />
            </div>
          ) : null}

          <div className={style.input}>
            <Input
              label="アイテムを登録"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className={style.submit}>
              <Button text="追加" onClick={addValue} />
            </div>
          </div>
        </div>
        <div className={style.footer}>
          <Button
            text="確定"
            width={120}
            onClick={() => {
              handleSubmit(selectedItem);
              close();
              setValue('');
            }}
          />
        </div>
      </div>

      <DialogWrapperMini
        closeDialog={handleCloseNoticePanel}
        handleOk={handleSubmitNoticePanel}
        isOpen={isOpenNoticePanel}
        title="全員のアイテムから削除されます">
        <ul>
          {removedItem.map((item) => (
            // FIXME: key
            <li className={style.item} key={item}>
              {item}
            </li>
          ))}
        </ul>
      </DialogWrapperMini>
    </>
  );
};
export default ItemSelectContainer;
