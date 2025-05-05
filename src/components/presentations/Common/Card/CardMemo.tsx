'use client';

import Linkify from 'linkify-react';

import style from './CardMemo.module.scss';

import IconEdit from '@/components/presentations/Icon/IconEdit';
import { MemoData } from '@/hooks/useMemos';

type Props = {
  memo: MemoData;
  onClick: () => void;
};
const CardMemo = ({ memo: { member, memo, memoId }, onClick }: Props) => (
  <div className={style.memo} key={memoId}>
    <div className={style.header}>
      <p aria-label={`記入者 ${member}`} className={style.member}>
        {member}
      </p>
      <button
        aria-label="このメモを編集する"
        className={style.icon}
        type="button"
        onClick={onClick}>
        <IconEdit />
      </button>
    </div>
    <div className={style.text}>
      <Linkify
        as="p"
        options={{
          className: style['link-text'],
          target: {
            url: '_blank', // TODO: noopener
          },
        }}>
        {memo}
      </Linkify>
    </div>
  </div>
);

export default CardMemo;
