'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

import { itemAtom } from '@/atoms/itemAtom';
import DialogWrapper from '@/components/Dialog/DialogWrapper';
import IconClose from '@/components/Icon/IconClose';
import IconEdit from '@/components/Icon/IconEdit';
import { useItemPage } from '@/hooks/pages/useItemPage';

import style from './DialogItemSelect.module.scss';

type Props = {
  selectedItems?: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: (selectedItem: string[]) => void;
};
const DialogItemSelect = ({
  isOpen,
  setIsOpen,
  handleSubmit,
  selectedItems = [],
}: Props) => {
  const [items, setItems] = useAtom(itemAtom);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');

  const { updateItemMaster } = useItemPage(); // TODO: ページ側で呼び出す

  useEffect(() => setSelectedItem(selectedItems), [selectedItems]);

  const updateSelectedItem = useCallback((selectedItem: string) => {
    setSelectedItem((prev) => {
      if (prev.includes(selectedItem))
        return prev.filter((elm) => elm != selectedItem);
      return [...prev, selectedItem];
    });
  }, []);

  const addValue = useCallback(async () => {
    if (value === '') return;
    if (items.includes(value)) return;
    const newItemMaster = await updateItemMaster([...items, value]);
    if (newItemMaster === undefined) return;
    setItems(newItemMaster);
    setValue('');
  }, [items, setItems, updateItemMaster, value]);

  const setIsDialogOpen = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) setSelectedItem(selectedItems);
      setIsOpen(isOpen);
    },
    [selectedItems, setIsOpen],
  );

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [tmpItem, setTmpItem] = useState<string[]>(items);
  useEffect(() => setTmpItem(items), [items]);
  console.log(items);

  return (
    <DialogWrapper isOpen={isOpen} setIsOpen={setIsDialogOpen}>
      <div className={style['dialog-content']}>
        <div className={style['header']}>
          <p className={style['title']}>持ち物を選択</p>
          <div className={style['icon']} onClick={() => setIsDialogOpen(false)}>
            <IconClose />
          </div>
        </div>
        <div className={style['body']}>
          <div className={style['buttons']}>
            {!isEditMode && (
              <>
                {items.map((item, i) => (
                  <p
                    className={clsx(
                      style['button'],
                      selectedItem.includes(item) && style['-selected'],
                      isEditMode && style['-edit'],
                    )}
                    onClick={() => updateSelectedItem(item)}
                    key={i}>
                    {item}
                  </p>
                ))}
                <div
                  className={style['icon']}
                  onClick={() => setIsEditMode(true)}>
                  <IconEdit />
                </div>
              </>
            )}
            {isEditMode && (
              <>
                {tmpItem.map((item, i) => (
                  <p className={clsx(style['button'], style['-edit'])} key={i}>
                    {item}
                    {isEditMode && (
                      <span
                        className={style['remove']}
                        onClick={() => {
                          const remainItem = tmpItem.filter(
                            (elm) => elm !== item,
                          );
                          setTmpItem(remainItem);
                        }}>
                        -
                      </span>
                    )}
                  </p>
                ))}
              </>
            )}
          </div>
          {isEditMode && (
            <div className={style['action']}>
              <button
                className={style['submit']}
                onClick={async () => {
                  const newItemMaster = await updateItemMaster(tmpItem);
                  if (newItemMaster === undefined) return;
                  setItems(newItemMaster); // TODO:  bringListにも反映
                  setIsEditMode(false);
                }}>
                確定
              </button>
              <button
                className={style['cancel']}
                onClick={() => {
                  setTmpItem(items);
                  setIsEditMode(false);
                }}>
                キャンセル
              </button>
            </div>
          )}

          <p className={style['caption']}>持ち物を登録</p>
          <div className={style['form']}>
            <input
              type="text"
              value={value}
              placeholder="item"
              className={style['input']}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className={style['action']}
              onClick={() => {
                addValue();
                updateSelectedItem(value);
              }}>
              追加
            </button>
          </div>

          <button
            className={style['submit']}
            onClick={() => {
              handleSubmit(selectedItem);
              setIsDialogOpen(false);
              setValue('');
            }}>
            確定
          </button>
        </div>
      </div>
    </DialogWrapper>
  );
};

export default DialogItemSelect;
