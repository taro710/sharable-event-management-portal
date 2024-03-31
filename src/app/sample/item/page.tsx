'use client';

import { NextPage } from 'next';
import { useMemo, useState } from 'react';

import Checkbox from '@/components/Checkbox';
import DialogItemSelect from '@/components/Dialog/DialogItemSelect';
import FadeIn from '@/components/FadeIn';
import Tag from '@/components/Tag';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [data, setData] = useState<{ text: string; bring: string[] }[]>([
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
  ]);

  const selectedData: { text: string; bring: string[] } | undefined = useMemo(
    () => data[selectedIndex],
    [data, selectedIndex],
  );

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
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
              <div className={style['item']} key={i}>
                <Checkbox label={item} index={i} />
              </div>
            ))}
          </div>
        </div>
        <button
          className={style['button']}
          onClick={() => setIsDialogOpen(true)}>
          +
        </button>
      </FadeIn>

      <dialog open={isDialogOpen} className={style['dialog-panel']}>
        <DialogItemSelect
          selectedItems={data[selectedIndex].bring}
          handleClose={() => setIsDialogOpen(false)}
          handleSubmit={(selectedItem) =>
            setData((prev) => {
              return prev.map((elm, i) => {
                if (i === selectedIndex) {
                  return { ...elm, bring: selectedItem };
                }
                return elm;
              });
            })
          }
        />
      </dialog>
    </>
  );
};

export default DashBoard;
