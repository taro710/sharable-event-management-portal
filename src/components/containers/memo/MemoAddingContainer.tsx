'use client';

import { useAtom } from 'jotai';
import { useState } from 'react';

import { eventAtom } from '@/atoms/eventAtom';
import Button from '@/components/presentations/Button';
import SelectBox from '@/components/presentations/Form/SelectBox';
import TextArea from '@/components/presentations/Form/TextArea';
import IconArrow from '@/components/presentations/Icon/IconArrow';
import IconClose from '@/components/presentations/Icon/IconClose';
import { MemoData } from '@/hooks/pages/useMemoPage';
import { useResponsive } from '@/hooks/useResponsive';

import style from './MemoAddingContainer.module.scss';

type Props = {
  handleSubmit: (memoData: Omit<MemoData, 'memoId'>) => void;
  close: () => void;
};

const MemoAddingContainer = ({ handleSubmit, close }: Props) => {
  const { isSp } = useResponsive();
  const [event] = useAtom(eventAtom);

  const [memo, setMemo] = useState<string>('');
  const [author, setAuthor] = useState<string>(event?.members[0] || '');

  return (
    <div className={style['dialog-content']}>
      <div className={style['header']}>
        <div className={style['icon']} onClick={close}>
          {isSp ? <IconArrow /> : <IconClose />}
        </div>
      </div>
      <div className={style['body']}>
        {event && (
          <SelectBox
            label="記入者"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}>
            {event.members.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </SelectBox>
        )}
        <TextArea
          label="メモ"
          value={memo}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length > 1000) {
              setMemo(value.slice(0, 1000));
              return;
            }
            setMemo(e.target.value);
          }}
        />

        <div className={style['footer']}>
          <p className={style['text']}>{`${memo.length}/1000`}</p>
          <Button
            text="追加"
            width={120}
            onClick={() => handleSubmit({ member: author, memo })}
          />
        </div>
      </div>
    </div>
  );
};
export default MemoAddingContainer;
