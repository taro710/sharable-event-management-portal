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
const DialogMemoAdding = ({ isOpen, setIsOpen }: Props) => {
  const [isOpenNoticePanel] = useState(false);

  return (
    <DialogWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        className={clsx(
          style['dialog-content'],
          isOpenNoticePanel && style['-disabled'],
        )}>
        <div className={style['header']}>
          <p className={style['title']}>メモを追加</p>
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
    </DialogWrapper>
  );
};

export default DialogMemoAdding;
