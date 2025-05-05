'use client';

import { NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import style from './page.module.scss';

import MemoAddingContainer from '@/components/containers/memo/MemoAddingContainer';
import MemoEditContainer from '@/components/containers/memo/MemoEditContainer';
import FadeIn from '@/components/presentations/Animation/FadeIn';
import CardMemo from '@/components/presentations/Common/Card/CardMemo';
import DialogMemoAdding from '@/components/presentations/Dialog/DialogMemoAdding';
import DialogMemoEdit from '@/components/presentations/Dialog/DialogMemoEdit';
import IconAdd from '@/components/presentations/Icon/IconAdd';
import { MemoData, useMemoPage } from '@/hooks/pages/useMemoPage';
import { useResponsive } from '@/hooks/useResponsive';

const DashBoard: NextPage = () => {
  const { isSp } = useResponsive();
  const eventId = useParams()?.eventId as string;
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const { memos, addMemo, updateMemo, deleteMemo } = useMemoPage(eventId);

  const [editingMemo, setEditingMemo] = useState<MemoData>();
  useEffect(() => {
    if (editingMemo) setIsEditDialogOpen(true);
  }, [editingMemo]);

  const ref = useRef<HTMLDivElement>(null);
  const openAddPanel = () => {
    if (isSp) window.scrollTo(0, 0);

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
  const openEditPanel = ({ member, memo: _memo, memoId }: any) => {
    if (isSp) {
      setScrollPosition(window.scrollY);
      window.scrollTo(0, 0);
    }

    setEditingMemo({ member, memo: _memo, memoId });
    setIsEditDialogOpen(true);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(-50%)';
  };

  const closeEditPanel = () => {
    if (isSp) window.scrollTo(0, scrollPosition);

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
          {memos.length <= 0 ? (
            <p className={style.notice}>メモはありません🙃</p>
          ) : null}
          {memos.map((memo) => (
            <CardMemo
              key={memo.memoId}
              memo={memo}
              onClick={() => openEditPanel(memo)}
            />
          ))}
        </FadeIn>

        <div className={style['container-component']}>
          {isAddDialogOpen ? (
            <MemoAddingContainer
              close={closeAddPanel}
              handleSubmit={async (_memo) => {
                await addMemo(_memo);
                closeAddPanel();
              }}
            />
          ) : null}
          {isEditDialogOpen && editingMemo ? (
            <MemoEditContainer
              close={closeEditPanel}
              handleDelete={async (memoId) => {
                await deleteMemo(memoId);
                closeEditPanel();
              }}
              handleSubmit={async (_memo) => {
                await updateMemo(_memo);
                closeEditPanel();
              }}
              memoData={editingMemo}
            />
          ) : null}
        </div>
      </div>

      {!isAddDialogOpen && !isEditDialogOpen ? (
        <button
          aria-label="メモを追加する"
          className={style['add-button']}
          type="button"
          onClick={openAddPanel}>
          <IconAdd />
        </button>
      ) : null}

      {/* PC専用 */}
      {isSp ? null : (
        <DialogMemoAdding
          closeDialog={closeAddPanel}
          handleSubmit={async (_memo) => {
            await addMemo(_memo);
            closeAddPanel();
          }}
          isOpen={isAddDialogOpen}
        />
      )}
      {editingMemo && !isSp ? (
        <DialogMemoEdit
          closeDialog={closeEditPanel}
          handleDelete={async (memoId) => {
            await deleteMemo(memoId);
            closeEditPanel();
          }}
          handleSubmit={async (_memo) => {
            await updateMemo(_memo);
            closeEditPanel();
          }}
          isOpen={isEditDialogOpen}
          memoData={editingMemo}
        />
      ) : null}
    </>
  );
};
export default DashBoard;
