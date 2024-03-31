'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useState } from 'react';

import { itemAtom } from '@/atoms/itemAtom';

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
  const [selectedItem, setSelectedItem] = useState<string[]>(selectedItems);
  const [value, setValue] = useState<string>('');

  return (
    <div className={style['dialog-content']}>
      <p>持ち物を選択</p>
      <span onClick={handleClose}>×</span>
      <div className={style['buttons']}>
        {items.map((item, i) => (
          <p
            className={clsx(
              style['button'],
              selectedItem.includes(item) && style['-selected'],
            )}
            onClick={() => {
              setSelectedItem((prev) => {
                if (prev.includes(item))
                  return prev.filter((elm) => elm != item);
                return [...prev, item];
              });
            }}
            key={i}>
            {item}
          </p>
        ))}
      </div>
      <p>持ち物を登録</p>
      <input
        type="text"
        value={value}
        placeholder="item"
        className={style['input-text']}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={() => {
          if (items.includes(value)) return;
          setItems((prev) => [...prev, value]);
        }}>
        追加
      </button>

      <br />
      <br />
      <br />
      {selectedItem.map((item) => (
        <p key={item}>{item}</p>
      ))}
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          handleSubmit(selectedItem);
          handleClose();
        }}>
        確定
      </button>
    </div>
  );
};

export default DialogItemSelect;
