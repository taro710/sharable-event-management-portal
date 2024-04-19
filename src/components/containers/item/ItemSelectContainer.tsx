'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

import { bringListAtom, itemAtom } from '@/atoms/itemAtom';
import Button from '@/components/presentations/Button';
import CheckboxTag from '@/components/presentations/CheckboxTag';
import IconClose from '@/components/presentations/Icon/IconClose';
import IconEdit from '@/components/presentations/Icon/IconEdit';
import IconRemove from '@/components/presentations/Icon/IconRemove';
import Input from '@/components/presentations/Input';
import { Data } from '@/hooks/pages/useItemPage';

import style from './ItemSelectContainer.module.scss';

type Props = {
  selectedItems: string[] | undefined;
  updateItem: (data: Data[]) => Promise<Data[] | undefined>;
  updateItemMaster: (data: string[]) => void;
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
  const [items, setItems] = useAtom(itemAtom);
  const [selectedItem, setSelectedItem] = useState<string[]>(selectedItems);
  const [value, setValue] = useState<string>('');

  console.log(selectedItem);

  // useEffect(() => setSelectedItem(selectedItems), [selectedItems]);

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
    updateSelectedItem(value);
    setItems(newItemMaster);
    setValue('');
  }, [items, setItems, updateItemMaster, updateSelectedItem, value]);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [tmpItem, setTmpItem] = useState<string[]>(items);
  useEffect(() => setTmpItem(items), [items]);

  const [data, setData] = useAtom(bringListAtom);

  const [removedItem, setRemovedItem] = useState<string[]>([]);
  const [isOpenNoticePanel, setIsOpenNoticePanel] = useState<boolean>(false);

  return (
    <>
      <div
        className={clsx(
          style['dialog-content'],
          isOpenNoticePanel && style['-disabled'],
        )}>
        <div className={style['header']}>
          <p className={style['title']}>アイテムを選択</p>
          <div
            className={style['icon']}
            onClick={() => {
              setSelectedItem(selectedItems);
              close();
            }}>
            <IconClose />
          </div>
        </div>
        <div className={style['body']}>
          <div className={style['buttons']}>
            {!isEditMode && (
              <>
                {items.map((item, i) => (
                  <div className={style['item']} key={i}>
                    <CheckboxTag
                      label={item}
                      defaultChecked={selectedItem.includes(item)}
                      onClick={() => updateSelectedItem(item)}
                    />
                  </div>
                ))}
                {items.length > 0 && (
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
                    <CheckboxTag label={item} defaultChecked={false} />
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
                onClick={() => {
                  setTmpItem(items);
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
            <Button text="追加" onClick={addValue} />
          </div>

          <div className={style['submit']}>
            <Button
              text="確定"
              onClick={() => {
                handleSubmit(selectedItem);
                close();
                setValue('');
              }}
            />
          </div>
        </div>
      </div>
      {isOpenNoticePanel && (
        <div className={style['notice-panel']}>
          <p className={style['text']}>全員のアイテムから削除されます</p>
          <ul className={style['list']}>
            {removedItem.map((item, i) => (
              <li className={style['item']} key={i}>
                {item}
              </li>
            ))}
          </ul>
          <div className={style['action']}>
            <button
              className={style['submit']}
              onClick={async () => {
                const newItemMaster = await updateItemMaster(tmpItem);
                if (newItemMaster === undefined) return;
                setItems(newItemMaster);

                const _newBringList = data.map((elm) => {
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
                setData(newItemList);
                setIsEditMode(false);
                setIsOpenNoticePanel(false);
              }}>
              確定
            </button>
            <button
              className={style['cancel']}
              onClick={() => {
                setTmpItem(items);
                setIsEditMode(false);
                setRemovedItem([]);
                setIsOpenNoticePanel(false);
              }}>
              キャンセル
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ItemSelectContainer;
