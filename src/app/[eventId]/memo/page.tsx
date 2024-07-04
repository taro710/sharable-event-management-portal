'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

import style from './page.module.scss';

import { memoAtom } from '@/atoms/memoAtom';
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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const [memo, setMemo] = useAtom(memoAtom);
  const { addMemo, updateMemo, deleteMemo } = useMemoPage(memo);

  const [editingMemo, setEditingMemo] = useState<MemoData>();
  useEffect(() => {
    if (editingMemo) setIsEditDialogOpen(true);
  }, [editingMemo]);

  const ref = useRef<HTMLDivElement>(null);
  const openAddPanel = () => {
    setScrollPosition(window.scrollY);
    window.scrollTo(0, 0);

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
    setScrollPosition(window.scrollY);
    window.scrollTo(0, 0);

    setEditingMemo({ member, memo: _memo, memoId });
    setIsEditDialogOpen(true);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(-50%)';
  };

  const closeEditPanel = () => {
    window.scrollTo(0, scrollPosition);
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
          {memo.length <= 0 ? (
            <p className={style.notice}>メモはありません🙃</p>
          ) : null}
          {memo.map((_memo) => (
            <CardMemo
              key={_memo.memoId}
              memo={_memo}
              onClick={() => openEditPanel(_memo)}
            />
          ))}
        </FadeIn>

        <div className={style['container-component']}>
          {isAddDialogOpen ? (
            <MemoAddingContainer
              close={closeAddPanel}
              handleSubmit={async (_memo) => {
                const result = await addMemo(_memo);
                if (!result) return;
                setMemo(result);
                closeAddPanel();
              }}
            />
          ) : null}
          {isEditDialogOpen && editingMemo ? (
            <MemoEditContainer
              close={closeEditPanel}
              handleDelete={async (memoId) => {
                const result = await deleteMemo(memoId);
                if (!result) return;
                setMemo(result);
                closeEditPanel();
              }}
              handleSubmit={async (_memo) => {
                const result = await updateMemo(_memo);
                if (!result) return;
                setMemo(result);
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
            const result = await addMemo(_memo);
            if (!result) return;
            setMemo(result);
            closeAddPanel();
          }}
          isOpen={isAddDialogOpen}
        />
      )}
      {editingMemo && !isSp ? (
        <DialogMemoEdit
          closeDialog={closeEditPanel}
          handleDelete={async (memoId) => {
            const result = await deleteMemo(memoId);
            if (!result) return;
            setMemo(result);
            closeEditPanel();
          }}
          handleSubmit={async (_memo) => {
            const result = await updateMemo(_memo);
            if (!result) return;
            setMemo(result);
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
