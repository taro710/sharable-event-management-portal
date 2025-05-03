import {
  getDoc,
  doc,
  deleteField,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { useParams } from 'next/navigation';

import { database } from '@/firebase';

export type MemoData = {
  memoId: number;
  member: string;
  memo: string;
};

export const useMemoPage = (currentMemos: MemoData[]) => {
  const eventId = useParams()?.eventId as string;

  const addMemo = async (data: Omit<MemoData, 'memoId'>) => {
    const newMemoId = (() => {
      if (currentMemos.length === 0) return 1;
      const ids = currentMemos.map((memo) => memo.memoId || 0);
      return Math.max(...ids) + 1;
    })();

    const docRef = doc(database, eventId, 'memo');
    try {
      await setDoc(
        docRef,
        { [newMemoId]: { ...data, memoId: newMemoId } },
        { merge: true },
      );
      const afterAddMemoData = [
        ...currentMemos,
        { ...data, memoId: newMemoId },
      ];
      return afterAddMemoData;
    } catch (e) {
      throw new Error('Error adding document');
    }
  };

  const updateMemo = async (data: MemoData) => {
    const docRef = doc(database, eventId, 'memo');
    try {
      await updateDoc(docRef, { [data.memoId]: data });

      const afterUpdateMemoData = [...currentMemos].map((memo) => {
        if (memo.memoId === data.memoId) return data;
        return memo;
      });
      return afterUpdateMemoData;
    } catch (e) {
      throw new Error('Error adding document');
    }
  };

  const getMemoList = async () => {
    const docRef = doc(database, eventId, 'memo');

    try {
      const document = await getDoc(docRef);
      const data = document?.data();
      const memoList: MemoData[] = Object.values(data || {});
      return memoList;
    } catch (error) {
      throw new Error('Error get document');
    }
  };

  const deleteMemo = async (memoId: number) => {
    const docRef = doc(database, eventId, 'memo');
    try {
      await updateDoc(docRef, { [memoId]: deleteField() });

      const afterDeleteMemoData = [...currentMemos].filter(
        (memo) => memo.memoId !== memoId,
      );
      return afterDeleteMemoData;
    } catch (e) {
      throw new Error('Error adding document');
    }
  };

  return {
    addMemo,
    updateMemo,
    getMemoList,
    deleteMemo,
  };
};
