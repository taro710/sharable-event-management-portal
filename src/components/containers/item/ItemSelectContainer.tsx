'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

import { bringListAtom, itemMasterAtom } from '@/atoms/itemAtom';
import Button from '@/components/presentations/Button';
import DialogWrapperMini from '@/components/presentations/Dialog/DialogWrapperMini';
import Input from '@/components/presentations/Form/Input';
import TagCheckbox from '@/components/presentations/Form/TagCheckbox';
import IconArrow from '@/components/presentations/Icon/IconArrow';
import IconClose from '@/components/presentations/Icon/IconClose';
import IconEdit from '@/components/presentations/Icon/IconEdit';
import IconRemove from '@/components/presentations/Icon/IconRemove';
import { Data } from '@/hooks/pages/useItemPage';
import { useResponsive } from '@/hooks/useResponsive';

import style from './ItemSelectContainer.module.scss';

type Props = {
  selectedItems: string[] | undefined;
  updateItem: (data: Data[]) => Promise<Data[] | undefined>;
  updateItemMaster: (data: string[]) => Promise<string[] | undefined>;
  handleSubmit: (selectedItem: string[]) => void;
  close: () => void;
};

const ItemSelectContainer = ({
  selectedItems = [],
  updateItem,
  updateItemMaster,
  handleSubmit,
  close,
}: Props) => {
  const { isSp } = useResponsive();
  const [itemMaster, setItemMaster] = useAtom(itemMasterAtom);
  const [bringList, setBringList] = useAtom(bringListAtom);

  const [selectedItem, setSelectedItem] = useState<string[]>(selectedItems);
  const [value, setValue] = useState<string>('');

  const updateSelectedItem = useCallback((selectedItem: string) => {
    setSelectedItem((prev) => {
      if (prev.includes(selectedItem))
        return prev.filter((elm) => elm != selectedItem);
      return [...prev, selectedItem];
    });
  }, []);

  const addValue = useCallback(async () => {
    if (value === '') return;
    if (itemMaster.includes(value)) return;
    const newItemMaster = await updateItemMaster([...itemMaster, value]);
    if (newItemMaster === undefined) return;
    updateSelectedItem(value);
    setItemMaster(newItemMaster);
    setValue('');
  }, [itemMaster, setItemMaster, updateItemMaster, updateSelectedItem, value]);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [tmpItem, setTmpItem] = useState<string[]>(itemMaster);
  useEffect(() => setTmpItem(itemMaster), [itemMaster]);

  const [removedItem, setRemovedItem] = useState<string[]>([]);
  const [isOpenNoticePanel, setIsOpenNoticePanel] = useState<boolean>(false);

  const handleCloseNoticePanel = () => {
    setTmpItem(itemMaster);
    setIsEditMode(false);
    setRemovedItem([]);
    setIsOpenNoticePanel(false);
  };

  const handleSubmitNoticePanel = useCallback(async () => {
    const newItemMaster = await updateItemMaster(tmpItem);
    if (newItemMaster === undefined) return;
    setItemMaster(newItemMaster);

    const _newBringList = bringList.map((elm) => {
      return {
        name: elm.name,
        item: elm.item.filter((item) => tmpItem.includes(item)),
      };
    });
    const newItemList = await updateItem(_newBringList);
    if (newItemList === undefined) {
      setIsEditMode(false);
      return;
    }
    setSelectedItem((prev) =>
      prev.filter((item) => newItemMaster.includes(item)),
    );
    setBringList(newItemList);
    setIsEditMode(false);
    setIsOpenNoticePanel(false);
  }, [
    bringList,
    setBringList,
    setItemMaster,
    tmpItem,
    updateItem,
    updateItemMaster,
  ]);

  return (
    <>
      <div
        className={clsx(
          style['dialog-content'],
          isOpenNoticePanel && style['-disabled'],
        )}>
        <div className={style['header']}>
          <div
            className={style['icon']}
            onClick={() => {
              setSelectedItem(selectedItems);
              close();
            }}>
            {isSp ? <IconArrow /> : <IconClose />}
          </div>
        </div>
        <div className={style['body']}>
          <div className={style['buttons']}>
            {!isEditMode && (
              <>
                {itemMaster.map((item, i) => (
                  <div className={style['item']} key={i}>
                    <TagCheckbox
                      label={item}
                      defaultChecked={selectedItem.includes(item)}
                      onClick={() => updateSelectedItem(item)}
                    />
                  </div>
                ))}
                {itemMaster.length > 0 && (
                  <div
                    className={style['icon']}
                    onClick={() => setIsEditMode(true)}>
                    <IconEdit />
                  </div>
                )}
              </>
            )}
            {isEditMode && (
              <>
                {tmpItem.map((item, i) => (
                  <div className={style['item']} key={i}>
                    <TagCheckbox label={item} defaultChecked={false} />
                    <div
                      className={style['icon']}
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
            )}
          </div>
          {isEditMode && (
            <div className={style['action']}>
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
                type="secondary"
                width={80}
                onClick={() => {
                  setTmpItem(itemMaster);
                  setIsEditMode(false);
                  setRemovedItem([]);
                }}
              />
            </div>
          )}

          <div className={style['input']}>
            <Input
              label="アイテムを登録"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className={style['submit']}>
              <Button text="追加" onClick={addValue} />
            </div>
          </div>
        </div>
        <div className={style['footer']}>
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
        title="全員のアイテムから削除されます"
        isOpen={isOpenNoticePanel}
        closeDialog={handleCloseNoticePanel}
        handleOk={handleSubmitNoticePanel}>
        <ul>
          {removedItem.map((item, i) => (
            <li className={style['item']} key={i}>
              {item}
            </li>
          ))}
        </ul>
      </DialogWrapperMini>
    </>
  );
};
export default ItemSelectContainer;
