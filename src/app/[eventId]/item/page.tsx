'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { useMemo, useRef, useState } from 'react';
import { useLocalStorage } from 'react-use';

import style from './page.module.scss';

import { eventAtom } from '@/atoms/eventAtom';
import { bringListAtom, itemMasterAtom } from '@/atoms/itemAtom';
import ItemSelectContainer from '@/components/containers/item/ItemSelectContainer';
import FadeIn from '@/components/presentations/Animation/FadeIn';
import Tag from '@/components/presentations/Common/Tag/Tag';
import DialogItemSelect from '@/components/presentations/Dialog/DialogItemSelect';
import Checkbox from '@/components/presentations/Form/Checkbox/Checkbox';
import IconEdit from '@/components/presentations/Icon/IconEdit';
import { useItemPage } from '@/hooks/pages/useItemPage';
import { useResponsive } from '@/hooks/useResponsive';

const DashBoard: NextPage = () => {
  const { isSp } = useResponsive();
  const [bringList, setBringList] = useAtom(bringListAtom);
  const [event] = useAtom(eventAtom);

  const members = event?.members;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedMember = members?.[selectedIndex];
  const selectedData = useMemo(() => {
    if (bringList.length <= 0) return;
    return bringList.find((elm) => elm.name === selectedMember);
  }, [bringList, selectedMember]);

  const [, setItems] = useAtom(itemMasterAtom);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { updateItem, updateItemMaster, getItemMaster } = useItemPage();

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

  const [checkedItem, setCheckedItem] = useLocalStorage<string[]>(
    'checkedItems',
    [],
  );

  const checkItem = (item: string) => {
    if (checkedItem === undefined) {
      setCheckedItem([item]);
      return;
    }
    if (checkedItem.includes(item)) return;
    setCheckedItem([...checkedItem, item]);
  };

  // TODO: LocalStorageのリセットタイミング
  const unCheckItem = (item: string) => {
    if (checkedItem === undefined) return;
    setCheckedItem(checkedItem.filter((elm) => elm !== item));
  };

  return (
    <>
      <div className={style['page-component']} ref={ref}>
        <FadeIn className={style['item-panel']}>
          <div className={style.tags}>
            {members?.map((name, i) => (
              <Tag
                isActive={i === selectedIndex}
                key={i}
                text={name}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </div>
          <div className={style.content}>
            <div className={style['item-list']}>
              {selectedData?.item.map((item, i) => (
                <div className={style.item} key={selectedData.name + item}>
                  <Checkbox
                    defaultChecked={checkedItem?.includes(
                      selectedData.name + item,
                    )}
                    id={selectedData.name + i}
                    label={item}
                    onChange={(e) => {
                      if (e.target.checked) {
                        checkItem(selectedData.name + item);
                        return;
                      }
                      unCheckItem(selectedData.name + item);
                    }}
                  />
                </div>
              ))}
            </div>
            {!selectedData || selectedData.item.length <= 0 ? (
              <p className={style.notice}>アイテムはありません😲</p>
            ) : null}
          </div>
        </FadeIn>

        <div className={style['container-component']}>
          {isDialogOpen ? (
            <ItemSelectContainer
              close={closePanel}
              handleSubmit={async (selectedItem) => {
                if (selectedMember === undefined) return;
                const args = (() => {
                  if (
                    bringList.find((elm) => elm.name === selectedMember) ===
                    undefined
                  ) {
                    return [
                      ...bringList,
                      {
                        name: selectedMember,
                        item: selectedItem,
                      },
                    ];
                  }

                  return bringList.map((elm) => {
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
                setBringList(result);
              }}
              selectedItems={selectedData?.item}
              updateItem={updateItem}
              updateItemMaster={updateItemMaster}
            />
          ) : null}
        </div>
      </div>

      {isDialogOpen ? null : (
        <button
          className={style['add-button']}
          type="button"
          onClick={async () => {
            openPanel();
            const items = await getItemMaster();
            if (items === undefined) return;
            setItems(items);
          }}>
          <IconEdit />
        </button>
      )}

      {isSp ? null : (
        <DialogItemSelect
          closeDialog={closePanel}
          handleSubmit={async (selectedItem) => {
            if (selectedMember === undefined) return;
            const args = (() => {
              if (
                bringList.find((elm) => elm.name === selectedMember) ===
                undefined
              ) {
                return [
                  ...bringList,
                  {
                    name: selectedMember,
                    item: selectedItem,
                  },
                ];
              }

              return bringList.map((elm) => {
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
            setBringList(result);
          }}
          isOpen={isDialogOpen}
          selectedItems={selectedData?.item}
          updateItem={updateItem}
          updateItemMaster={updateItemMaster}
        />
      )}
    </>
  );
};

export default DashBoard;
