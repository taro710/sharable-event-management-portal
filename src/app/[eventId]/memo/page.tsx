'use client';

import { useAtom } from 'jotai';
import Linkify from 'linkify-react';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

import { memoAtom } from '@/atoms/memoAtom';
import MemoAddingContainer from '@/components/containers/memo/MemoAddingContainer';
import MemoEditContainer from '@/components/containers/memo/MemoEditContainer';
import DialogMemoAdding from '@/components/presentations/Dialog/DialogMemoAdding';
import DialogMemoEdit from '@/components/presentations/Dialog/DialogMemoEdit';
import FadeIn from '@/components/presentations/FadeIn';
import IconAdd from '@/components/presentations/Icon/IconAdd';
import IconEdit from '@/components/presentations/Icon/IconEdit';
import { MemoData, useMemoPage } from '@/hooks/pages/useMemoPage';
import { useResponsive } from '@/hooks/useResponsive';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const { isSp } = useResponsive();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const [memo, setMemo] = useAtom(memoAtom);
  const { addMemo, updateMemo, deleteMemo } = useMemoPage(memo);

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
          {memo.length <= 0 && (
            <p className={style['notice']}>メモはありません🙃</p>
          )}
          {memo.map(({ member, memo, memoId }) => (
            <div className={style['memo']} key={memoId}>
              <div className={style['header']}>
                <p className={style['member']}>{member}</p>
                <div
                  className={style['icon']}
                  onClick={() => openEditPanel({ member, memo, memoId })}>
                  <IconEdit />
                </div>
              </div>
              <div className={style['text']}>
                <Linkify
                  as={'p'}
                  options={{
                    className: style['link-text'],
                    target: {
                      url: '_blank', // TODO: noopener
                    },
                  }}>
                  {memo}
                </Linkify>
              </div>
            </div>
          ))}
        </FadeIn>

        <div className={style['container-component']}>
          {isAddDialogOpen && (
            <MemoAddingContainer
              close={closeAddPanel}
              handleSubmit={async (memo) => {
                const result = await addMemo(memo);
                if (!result) return;
                setMemo(result);
                closeAddPanel();
              }}
            />
          )}
          {isEditDialogOpen && editingMemo && (
            <MemoEditContainer
              close={closeEditPanel}
              memoData={editingMemo}
              handleDelete={async (memoId) => {
                const result = await deleteMemo(memoId);
                if (!result) return;
                setMemo(result);
                closeEditPanel();
              }}
              handleSubmit={async (memo) => {
                const result = await updateMemo(memo);
                if (!result) return;
                setMemo(result);
                closeEditPanel();
              }}
            />
          )}
        </div>
      </div>

      {!isAddDialogOpen && !isEditDialogOpen && (
        <button className={style['add-button']} onClick={openAddPanel}>
          <IconAdd />
        </button>
      )}

      {/* PC専用 */}
      {!isSp && (
        <DialogMemoAdding
          isOpen={isAddDialogOpen}
          closeDialog={closeAddPanel}
          handleSubmit={async (memo) => {
            const result = await addMemo(memo);
            if (!result) return;
            setMemo(result);
            closeAddPanel();
          }}
        />
      )}
      {editingMemo && !isSp && (
        <DialogMemoEdit
          isOpen={isEditDialogOpen}
          closeDialog={closeEditPanel}
          memoData={editingMemo}
          handleDelete={async (memoId) => {
            const result = await deleteMemo(memoId);
            if (!result) return;
            setMemo(result);
            closeEditPanel();
          }}
          handleSubmit={async (memo) => {
            const result = await updateMemo(memo);
            if (!result) return;
            setMemo(result);
            closeEditPanel();
          }}
        />
      )}
    </>
  );
};

export default DashBoard;
