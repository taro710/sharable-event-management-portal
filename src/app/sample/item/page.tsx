'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { useEffect, useMemo, useRef, useState } from 'react';

import { bringListAtom, itemAtom } from '@/atoms/itemAtom';
import Checkbox from '@/components/Checkbox';
import DialogItemSelect from '@/components/Dialog/DialogItemSelect';
import FadeIn from '@/components/FadeIn';
import IconEdit from '@/components/Icon/IconEdit';
import Tag from '@/components/Tag';
import ItemSelectContainer from '@/components/containers/ItemSelectContainer';
import { useItemPage } from '@/hooks/pages/useItemPage';
import { useResponsive } from '@/hooks/useResponsive';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const { isSp } = useResponsive();
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

  const ref = useRef<HTMLDivElement>(null);

  const openPanel = () => {
    setIsDialogOpen(true);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(-50%)';
  };

  const closePanel = () => {
    setIsDialogOpen(false);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(0)';
  };

  if (data.length === 0) return <p>loading...</p>;
  return (
    <>
      <div className={style['page-component']} ref={ref}>
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
              <p className={style['notice']}>アイテムはありません</p>
            )}
          </div>
        </FadeIn>

        <button
          className={style['add-button']}
          onClick={async () => {
            openPanel();
            const items = await getItemMaster();
            if (items === undefined) return;
            setItems(items);
          }}>
          <IconEdit />
        </button>

        <div className={style['container-component']}>
          <ItemSelectContainer
            selectedItems={data[selectedIndex].bring}
            close={closePanel}
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
        </div>
      </div>

      {!isSp && (
        <DialogItemSelect
          selectedItems={data[selectedIndex].bring}
          isOpen={isDialogOpen}
          closeDialog={closePanel}
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
      )}
    </>
  );
};

export default DashBoard;
