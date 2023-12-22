'use client';

import clsx from 'clsx';
import { NextPage } from 'next';
import { useMemo, useState } from 'react';

import Checkbox from '@/components/Checkbox';
import FadeIn from '@/components/FadeIn';
import Tag from '@/components/Tag';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const selectedData: { text: string; bring: string[] } | undefined = useMemo(
    () => data[selectedIndex],
    [selectedIndex],
  );

  return (
    <FadeIn className={style['item-panel']}>
      <div className={style['tags']}>
        {data.map(({ text }, i) => (
          <Tag
            text={text}
            isActive={i === selectedIndex}
            onClick={() => setSelectedIndex(i)}
            key={i}
          />
        ))}
      </div>
      <div className={style['content']}>
        <div className={style['item-list']}>
          {selectedData.bring.map((item, i) => (
            <>
              {(i === 2 || i === 3) && (
                <p className={style['notice-text']}>Request from そめ</p>
              )}
              <div className={style['item']} key={i}>
                <Checkbox label={item} index={i} />

                {(i === 2 || i === 3) && (
                  <div className={style['buttons']}>
                    <button className={clsx(style['button'], style['-ok'])}>
                      承認
                    </button>
                    <button className={clsx(style['button'], style['-ng'])}>
                      却下
                    </button>
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
      </div>
      <button className={style['button']}>+</button>
    </FadeIn>
  );
};

export default DashBoard;

const data: { text: string; bring: string[] }[] = [
  {
    text: 'たろ',
    bring: ['イス', 'シュラフ', 'カメラ', 'クッカー'],
  },
  {
    text: 'そめ',
    bring: ['イス', 'シュラフ', 'テント'],
  },
  {
    text: 'ハマ',
    bring: ['イス', 'シュラフ', 'ランタン', 'クッカー'],
  },
  {
    text: '黒田',
    bring: ['イス', 'シュラフ', 'クッカー', 'コット'],
  },
  {
    text: 'フラ',
    bring: ['イス', 'シュラフ', 'コット'],
  },
  {
    text: 'りゅー',
    bring: ['イス', 'シュラフ'],
  },
];
