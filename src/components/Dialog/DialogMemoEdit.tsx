'use client';

import clsx from 'clsx';
import { useState } from 'react';

import Button from '@/components/Button';
import DialogWrapper from '@/components/Dialog/DialogWrapper';
import IconClose from '@/components/Icon/IconClose';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';

import style from './DialogMemoAdding.module.scss';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: (selectedItem: string[]) => void;
};
const DialogMemoEdit = ({ isOpen, setIsOpen }: Props) => {
  const [isOpenNoticePanel] = useState(false);

  return (
    <DialogWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        className={clsx(
          style['dialog-content'],
          isOpenNoticePanel && style['-disabled'],
        )}>
        <div className={style['header']}>
          <p className={style['title']}>メモを編集</p>
          <div className={style['icon']} onClick={() => setIsOpen(false)}>
            <IconClose />
          </div>
        </div>
        <div className={style['body']}>
          <Input label="記入者" />
          <TextArea label="メモ" />

          <div className={style['footer']}>
            <p className={style['text']}>残り1000文字</p>
            <Button text="確定" onClick={() => {}} />
          </div>
        </div>
      </div>

      {/* {isOpenNoticePanel && (
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
      )} */}
    </DialogWrapper>
  );
};

export default DialogMemoEdit;
