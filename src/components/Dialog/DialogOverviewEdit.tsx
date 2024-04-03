'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

import { bringListAtom, itemAtom } from '@/atoms/itemAtom';
import DialogWrapper from '@/components/Dialog/DialogWrapper';
import IconClose from '@/components/Icon/IconClose';
import { useItemPage } from '@/hooks/pages/useItemPage';

import style from './DialogOverviewEdit.module.scss';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: (selectedItem: string[]) => void;
};
const DialogOverviewEdit = ({ isOpen, setIsOpen, handleSubmit }: Props) => {
  const [items, setItems] = useAtom(itemAtom);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');

  const { updateBringList, updateItemMaster } = useItemPage(); // TODO: ページ側で呼び出す

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
      setIsOpen(isOpen);
    },
    [setIsOpen],
  );

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [tmpItem, setTmpItem] = useState<string[]>(items);
  useEffect(() => setTmpItem(items), [items]);

  const [data, setData] = useAtom(bringListAtom);

  const [removedItem, setRemovedItem] = useState<string[]>([]);
  const [isOpenNoticePanel, setIsOpenNoticePanel] = useState<boolean>(false);

  const members = ['たろ', 'そめ', 'ハマ', '黒田', 'フラ', 'りゅー'];

  return (
    <DialogWrapper isOpen={isOpen} setIsOpen={setIsDialogOpen}>
      <div
        className={clsx(
          style['dialog-content'],
          isOpenNoticePanel && style['-disabled'],
        )}>
        <div className={style['header']}>
          <p className={style['title']}>イベントを編集</p>
          <div className={style['icon']} onClick={() => setIsDialogOpen(false)}>
            <IconClose />
          </div>
        </div>
        <div className={style['body']}>
          <div className={style['form']}>
            <p className={style['caption']}>イベント名</p>
            <div className={style['field']}>
              <input
                type="text"
                value={value}
                placeholder="item"
                className={style['input']}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <p className={style['caption']}>メンバー</p>
            <ul className={style['list']}>
              {members.map((member, i) => (
                <li className={clsx(style['member'])} key={i}>
                  {member}
                </li>
              ))}
            </ul>
            <div className={style['field']}>
              <input
                type="text"
                value={value}
                placeholder="メンバー"
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
            <p className={style['caption']}>集合場所</p>
            <div className={style['field']}>
              <input
                type="text"
                value={value}
                placeholder="item"
                className={style['input']}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <p className={style['caption']}>集合時間</p>
            <div className={style['field']}>
              <input
                type="text"
                value={value}
                placeholder="item"
                className={style['input']}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <p className={style['caption']}>集合場所</p>
            <div className={style['field']}>
              <input
                type="text"
                value={value}
                placeholder="item"
                className={style['input']}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <p className={style['caption']}>解散時間</p>
            <div className={style['field']}>
              <input
                type="text"
                value={value}
                placeholder="item"
                className={style['input']}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <p className={style['caption']}>解散場所</p>
            <div className={style['field']}>
              <input
                type="text"
                value={value}
                placeholder="item"
                className={style['input']}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
          <div className={style['action']}>
            <button
              className={style['submit']}
              onClick={() => {
                if (removedItem.length === 0) {
                  setIsEditMode(false);
                  return;
                }
                setIsOpenNoticePanel(true);
              }}>
              確定
            </button>
            <button
              className={style['cancel']}
              onClick={() => {
                setTmpItem(items);
                setIsEditMode(false);
                setRemovedItem([]);
              }}>
              キャンセル
            </button>
          </div>
        </div>
      </div>
      {isOpenNoticePanel && (
        <div className={style['notice-panel']}>
          <p className={style['text']}>全員の持ち物から削除されます</p>
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
                    bring: elm.bring.filter((item) => tmpItem.includes(item)),
                  };
                });
                const newBringList = await updateBringList(_newBringList);
                if (newBringList === undefined) {
                  setIsEditMode(false);
                  return;
                }
                setData(newBringList);
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
    </DialogWrapper>
  );
};

export default DialogOverviewEdit;
