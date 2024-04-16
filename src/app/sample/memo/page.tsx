'use client';

import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

import DialogMemoAdding from '@/components/Dialog/DialogMemoAdding';
import DialogMemoEdit from '@/components/Dialog/DialogMemoEdit';
import FadeIn from '@/components/FadeIn';
import IconAdd from '@/components/Icon/IconAdd';
import IconEdit from '@/components/Icon/IconEdit';
import { MemoData, useMemoPage } from '@/hooks/pages/useMemoPage';

import style from './page.module.scss';
import { useRouter } from 'next/navigation';
import MemoAddingContainer from '@/components/containers/MemoAddingContainer';
import { useResponsive } from '@/hooks/useResponsive';
import MemoEditContainer from '@/components/containers/MemoEditContainer';

const DashBoard: NextPage = () => {
  const { isSp } = useResponsive();
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

  const ref = useRef<HTMLDivElement>(null);
  const openAddPanel = () => {
    setIsAddDialogOpen(true);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(-50%)';
  };

  const closeAddPanel = () => {
    setIsAddDialogOpen(false);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(0)';
  };

  // TODO: any
  const openEditPanel = ({ member, memo, memoId }: any) => {
    setEditingMemo({ member, memo, memoId });
    setIsEditDialogOpen(true);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(-50%)';
  };

  const closeEditPanel = () => {
    setEditingMemo(undefined);
    setIsEditDialogOpen(false);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(0)';
  };

  return (
    <>
      <div className={style['page-component']} ref={ref}>
        <FadeIn className={style['memo-panel']}>
          {memoData.map(({ member, memo, memoId }) => (
            <div className={style['memo']} key={memoId}>
              <div className={style['header']}>
                <p className={style['member']}>{member}</p>
                <div
                  className={style['icon']}
                  onClick={() => openEditPanel({ member, memo, memoId })}>
                  <IconEdit />
                </div>
              </div>
              <p className={style['text']}>{memo}</p>
            </div>
          ))}
        </FadeIn>
        <button className={style['add-button']} onClick={openAddPanel}>
          <IconAdd />
        </button>

        <div className={style['container-component']}>
          {isAddDialogOpen && (
            <MemoAddingContainer
              close={closeAddPanel}
              handleSubmit={async (memo) => {
                const result = await addMemo(memo);
                if (!result) return;
                setMemoData(result);
                closeAddPanel();
              }}
            />
          )}
          {isEditDialogOpen && editingMemo && (
            <MemoEditContainer
              close={closeEditPanel}
              memoData={editingMemo}
              handleSubmit={async (memo) => {
                const result = await addMemo(memo);
                if (!result) return;
                setMemoData(result);
                closeAddPanel();
              }}
            />
          )}
        </div>
      </div>

      {/* PC専用 */}
      {isAddDialogOpen && !isSp && (
        <DialogMemoAdding
          isOpen={isAddDialogOpen}
          closeDialog={closeAddPanel}
          handleSubmit={async (memo) => {
            const result = await addMemo(memo);
            if (!result) return;
            setMemoData(result);
            closeAddPanel();
          }}
        />
      )}
      {isEditDialogOpen && editingMemo && !isSp && (
        <DialogMemoEdit
          isOpen={isEditDialogOpen}
          closeDialog={closeEditPanel}
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
