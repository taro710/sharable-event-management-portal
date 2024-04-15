'use client';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import DialogMemoAdding from '@/components/Dialog/DialogMemoAdding';
import DialogMemoEdit from '@/components/Dialog/DialogMemoEdit';
import FadeIn from '@/components/FadeIn';
import IconAdd from '@/components/Icon/IconAdd';
import IconEdit from '@/components/Icon/IconEdit';
import { MemoData, useMemoPage } from '@/hooks/pages/useMemoPage';

import style from './page.module.scss';
import { useRouter } from 'next/navigation';
import MemoAddingContainer from '@/components/containers/MemoAddingContainer';

const DashBoard: NextPage = () => {
  const router = useRouter();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const [memoData, setMemoData] = useState<MemoData[]>([]);
  const { getMemoList, addMemo, updateMemo } = useMemoPage(memoData);

  // TODO:
  useEffect(() => {
    (async () => {
      const data = await getMemoList();
      if (data === undefined) return;
      setMemoData(data);
    })();
  }, []);

  const [editingMemo, setEditingMemo] = useState<MemoData>();
  useEffect(() => {
    if (editingMemo) setIsEditDialogOpen(true);
  }, [editingMemo]);

  return (
    <>
      <div className={style['page-component']}>
        <FadeIn className={style['memo-panel']}>
          {memoData.map(({ member, memo, memoId }) => (
            <div className={style['memo']} key={memoId}>
              <div className={style['header']}>
                <p className={style['member']}>{member}</p>
                <div
                  className={style['icon']}
                  onClick={() => setEditingMemo({ member, memo, memoId })}>
                  <IconEdit />
                </div>
              </div>
              <p className={style['text']}>{memo}</p>
            </div>
          ))}
        </FadeIn>
        <button
          className={style['add-button']}
          onClick={() => {
            setIsAddDialogOpen(true); // TODO:
          }}>
          <IconAdd />
        </button>

        <div className={style['container-component']}>
          <MemoAddingContainer
            setIsOpen={setIsAddDialogOpen}
            handleSubmit={async (memo) => {
              const result = await addMemo(memo);
              if (!result) return;
              setMemoData(result);
              setIsAddDialogOpen(false);
            }}
          />
        </div>
      </div>

      {isAddDialogOpen && (
        <DialogMemoAdding
          isOpen={isAddDialogOpen}
          setIsOpen={setIsAddDialogOpen}
          handleSubmit={async (memo) => {
            const result = await addMemo(memo);
            if (!result) return;
            setMemoData(result);
            setIsAddDialogOpen(false);
          }}
        />
      )}
      {editingMemo && (
        <DialogMemoEdit
          isOpen={isEditDialogOpen}
          setIsOpen={(isOpen: boolean) => {
            if (!isOpen) setEditingMemo(undefined);
            setIsEditDialogOpen(isOpen);
          }}
          memoData={editingMemo}
          handleSubmit={async (memo) => {
            const result = await updateMemo(memo);
            if (!result) return;
            setMemoData(result);
            setIsEditDialogOpen(false);
          }}
        />
      )}
    </>
  );
};

export default DashBoard;
