'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';

import { bringListAtom, itemAtom } from '@/atoms/itemAtom';
import Checkbox from '@/components/Checkbox';
import DialogItemSelect from '@/components/Dialog/DialogItemSelect';
import FadeIn from '@/components/FadeIn';
import IconEdit from '@/components/Icon/IconEdit';
import Tag from '@/components/Tag';
import { useItemPage } from '@/hooks/pages/useItemPage';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [data, setData] = useAtom(bringListAtom);

  const selectedData: { name: string; bring: string[] } | undefined = useMemo(
    () => data[selectedIndex],
    [data, selectedIndex],
  );

  const [, setItems] = useAtom(itemAtom);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { updateBringList, getBringList, getItemMaster } = useItemPage();

  // TODO:
  useEffect(() => {
    (async () => {
      const data = await getBringList();
      if (data === undefined) return;
      setData(data);
    })();
  }, []);

  if (data.length === 0) return <p>loading...</p>;
  return (
    <>
      <FadeIn className={style['item-panel']}>
        <div className={style['tags']}>
          {data.map(({ name }, i) => (
            <Tag
              text={name}
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
          {data[selectedIndex].bring.length <= 0 && (
            <p className={style['notice']}>持ち物はありません</p>
          )}
        </div>
        <button
          className={style['button']}
          onClick={async () => {
            setIsDialogOpen(true);
            const items = await getItemMaster();
            if (items === undefined) return;
            setItems(items);
          }}>
          <IconEdit />
        </button>
      </FadeIn>

      <DialogItemSelect
        selectedItems={data[selectedIndex].bring}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        handleSubmit={async (selectedItem) => {
          const newData = data.map((elm, i) => {
            if (i === selectedIndex) return { ...elm, bring: selectedItem };
            return elm;
          });
          const result = await updateBringList(newData);
          if (result === undefined) return;
          setData(result);
        }}
      />
    </>
  );
};

export default DashBoard;
