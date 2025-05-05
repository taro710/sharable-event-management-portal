'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { useLocalStorage } from 'react-use';

import style from './page.module.scss';

import { eventAtom } from '@/atoms/eventAtom';
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
  const eventId = useParams()?.eventId as string;
  const { items, updateItem } = useItemPage(eventId);
  const [event] = useAtom(eventAtom);

  const members = event?.members;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedMember = members?.[selectedIndex];
  const selectedData = useMemo(() => {
    if (items.length <= 0) return undefined;
    return items.find((item) => item.name === selectedMember);
  }, [items, selectedMember]);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const openPanel = () => {
    if (isSp) window.scrollTo(0, 0);

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
                aria-current={i === selectedIndex ? 'true' : undefined}
                isActive={i === selectedIndex}
                key={name} // FIXME:
                text={name}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </div>
          <div className={style.content}>
            <div className={style['item-list']}>
              {selectedData?.item.map((item) => (
                <div className={style.item} key={selectedData.name + item}>
                  <Checkbox
                    defaultChecked={checkedItem?.includes(
                      selectedData.name + item,
                    )}
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
                    items.find((elm) => elm.name === selectedMember) ===
                    undefined
                  ) {
                    return [
                      ...items,
                      {
                        name: selectedMember,
                        item: selectedItem,
                      },
                    ];
                  }

                  return items.map((elm) => {
                    if (elm.name === selectedMember) {
                      return {
                        name: elm.name,
                        item: selectedItem,
                      };
                    }
                    return elm;
                  });
                })();

                await updateItem(args);
              }}
              items={items}
              selectedItems={selectedData?.item}
              updateItem={updateItem}
            />
          ) : null}
        </div>
      </div>

      {isDialogOpen ? null : (
        <button
          aria-label={`${selectedMember}のアイテムを編集する`}
          className={style['add-button']}
          type="button"
          onClick={() => openPanel()}>
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
                items.find((elm) => elm.name === selectedMember) === undefined
              ) {
                return [
                  ...items,
                  {
                    name: selectedMember,
                    item: selectedItem,
                  },
                ];
              }

              return items.map((elm) => {
                if (elm.name === selectedMember) {
                  return {
                    name: elm.name,
                    item: selectedItem,
                  };
                }
                return elm;
              });
            })();

            await updateItem(args);
          }}
          isOpen={isDialogOpen}
          items={items}
          selectedItems={selectedData?.item}
          updateItem={updateItem}
        />
      )}
    </>
  );
};
export default DashBoard;
