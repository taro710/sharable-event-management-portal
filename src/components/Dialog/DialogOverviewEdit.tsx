'use client';

import clsx from 'clsx';
import { useCallback, useState } from 'react';

import Button from '@/components/Button';
import DialogWrapper from '@/components/Dialog/DialogWrapper';
import IconClose from '@/components/Icon/IconClose';
import Input from '@/components/Input';
import TagButton from '@/components/TagButton';

import style from './DialogOverviewEdit.module.scss';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: (selectedItem: string[]) => void;
};
const DialogOverviewEdit = ({ isOpen, setIsOpen }: Props) => {
  const setIsDialogOpen = useCallback(
    (isOpen: boolean) => {
      setIsOpen(isOpen);
    },
    [setIsOpen],
  );

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
            <Input label="イベント名" />
            <div className={style['member-field']}>
              <div className={style['member']}>
                <Input label="メンバー" />
                <Button text="追加" onClick={() => {}} />
              </div>
              <ul className={style['list']}>
                {members.map((member, i) => (
                  <TagButton text={member} key={i} isActive={false} />
                ))}
              </ul>
            </div>
            <Input label="集合場所" />
            <Input label="集合時間" />
            <Input label="解散場所" />
            <Input label="解散時間" />
          </div>
          <div className={style['action']}>
            <Button text="確定" onClick={() => setIsOpenNoticePanel(true)} />
            <Button
              text="キャンセル"
              type="secondary"
              onClick={() => setIsOpenNoticePanel(true)}
            />
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

export default DialogOverviewEdit;
