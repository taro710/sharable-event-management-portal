'use client';

import clsx from 'clsx';
import { useState } from 'react';

import Button from '@/components/Button';
import IconClose from '@/components/Icon/IconClose';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import { MemoData } from '@/hooks/pages/useMemoPage';

import style from './MemoAddingContainer.module.scss';

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: (memoData: MemoData) => void;
};

const MemoAddingContainer = ({ setIsOpen, handleSubmit }: Props) => {
  const [isOpenNoticePanel] = useState(false);

  const [memo, setMemo] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  return (
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
        <Input
          label="記入者"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <TextArea
          label="メモ"
          value={memo}
          onChange={(e) => {
            setMemo(e.target.value);
          }}
        />

        <div className={style['footer']}>
          <p className={style['text']}>残り1000文字</p>
          <Button
            text="確定"
            onClick={() => handleSubmit({ member: author, memo })}
          />
        </div>
      </div>
    </div>
  );
};
export default MemoAddingContainer;
