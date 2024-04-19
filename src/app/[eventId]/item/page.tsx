'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { useEffect, useMemo, useRef, useState } from 'react';

import { eventAtom } from '@/atoms/eventAtom';
import { bringListAtom, itemAtom } from '@/atoms/itemAtom';
import ItemSelectContainer from '@/components/containers/item/ItemSelectContainer';
import Checkbox from '@/components/presentations/Checkbox';
import DialogItemSelect from '@/components/presentations/Dialog/DialogItemSelect';
import FadeIn from '@/components/presentations/FadeIn';
import IconEdit from '@/components/presentations/Icon/IconEdit';
import Tag from '@/components/presentations/Tag';
import { useItemPage } from '@/hooks/pages/useItemPage';
import { useResponsive } from '@/hooks/useResponsive';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const { isSp } = useResponsive();
  const [data, setData] = useAtom(bringListAtom);
  const [event] = useAtom(eventAtom);

  const members = event?.members;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedMember = members?.[selectedIndex];
  const selectedData = useMemo(() => {
    if (data.length <= 0) return;
    return data.find((elm) => elm.name === selectedMember);
  }, [data, selectedMember]);

  const [, setItems] = useAtom(itemAtom);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { getItemList, updateItem, updateItemMaster, getItemMaster } =
    useItemPage();

  // TODO:
  useEffect(() => {
    (async () => {
      const data = await getItemList();
      console.log(data);
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

  return (
    <>
      <div className={style['page-component']} ref={ref}>
        <FadeIn className={style['item-panel']}>
          <div className={style['tags']}>
            {members?.map((name, i) => (
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
              {selectedData?.item.map((item, i) => (
                <div className={style['item']} key={i}>
                  <Checkbox label={item} index={i} />
                </div>
              ))}
            </div>
            {(!selectedData || selectedData.item.length <= 0) && (
              <p className={style['notice']}>アイテムはありません</p>
            )}
          </div>
        </FadeIn>

        <div className={style['container-component']}>
          {isDialogOpen && (
            <ItemSelectContainer
              selectedItems={selectedData?.item}
              close={closePanel}
              updateItem={updateItem}
              updateItemMaster={updateItemMaster}
              handleSubmit={async (selectedItem) => {
                if (selectedMember === undefined) return;
                const args = (() => {
                  if (
                    data.find((elm) => elm.name === selectedMember) ===
                    undefined
                  ) {
                    return [
                      ...data,
                      {
                        name: selectedMember,
                        item: selectedItem,
                      },
                    ];
                  }

                  return data.map((elm) => {
                    if (elm.name === selectedMember) {
                      return {
                        name: elm.name,
                        item: selectedItem,
                      };
                    }
                    return elm;
                  });
                })();

                const result = await updateItem(args);
                if (result === undefined) return;
                setData(result);
              }}
            />
          )}
        </div>
      </div>

      {!isDialogOpen && (
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
      )}

      {!isSp && (
        <DialogItemSelect
          selectedItems={selectedData?.item}
          isOpen={isDialogOpen}
          closeDialog={closePanel}
          updateItem={updateItem}
          updateItemMaster={updateItemMaster}
          handleSubmit={async (selectedItem) => {
            if (selectedMember === undefined) return;
            const args = (() => {
              if (
                data.find((elm) => elm.name === selectedMember) === undefined
              ) {
                return [
                  ...data,
                  {
                    name: selectedMember,
                    item: selectedItem,
                  },
                ];
              }

              return data.map((elm) => {
                if (elm.name === selectedMember) {
                  return {
                    name: elm.name,
                    item: selectedItem,
                  };
                }
                return elm;
              });
            })();

            const result = await updateItem(args);
            if (result === undefined) return;
            setData(result);
          }}
        />
      )}
    </>
  );
};

export default DashBoard;
