'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

import { itemAtom } from '@/atoms/itemAtom';
import IconClose from '@/components/Icon/IconClose';

import style from './DialogItemSelect.module.scss';

type Props = {
  selectedItems?: string[];
  handleClose: () => void;
  handleSubmit: (selectedItem: string[]) => void;
};
const DialogItemSelect = ({
  handleClose,
  handleSubmit,
  selectedItems = [],
}: Props) => {
  const [items, setItems] = useAtom(itemAtom);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');

  useEffect(() => setSelectedItem(selectedItems), [selectedItems]);

  const updateSelectedItem = useCallback((selectedItem: string) => {
    setSelectedItem((prev) => {
      if (prev.includes(selectedItem))
        return prev.filter((elm) => elm != selectedItem);
      return [...prev, selectedItem];
    });
  }, []);

  const addValue = useCallback(() => {
    if (value === '') return;
    if (items.includes(value)) return;
    setItems((prev) => [...prev, value]);
    setValue('');
  }, [items, setItems, value]);

  return (
    <div className={style['dialog-content']}>
      <div className={style['header']}>
        <p className={style['title']}>持ち物を選択</p>
        <div className={style['icon']} onClick={handleClose}>
          <IconClose />
        </div>
      </div>
      <div className={style['body']}>
        <div className={style['buttons']}>
          {items.map((item, i) => (
            <p
              className={clsx(
                style['button'],
                selectedItem.includes(item) && style['-selected'],
              )}
              onClick={() => updateSelectedItem(item)}
              key={i}>
              {item}
            </p>
          ))}
        </div>
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
            handleClose();
            setValue('');
          }}>
          確定
        </button>
      </div>
    </div>
  );
};

export default DialogItemSelect;
