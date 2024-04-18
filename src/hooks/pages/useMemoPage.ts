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

export const useMemoPage = (currentMemoData: MemoData[]) => {
  const eventId = useParams()?.eventId as string;

  const addMemo = async (data: Omit<MemoData, 'memoId'>) => {
    const newMemoId = (() => {
      if (currentMemoData.length === 0) return 1;
      const ids = currentMemoData.map((memo) => memo.memoId || 0);
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
        ...currentMemoData,
        { ...data, memoId: newMemoId },
      ];
      return afterAddMemoData;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const updateMemo = async (data: MemoData) => {
    const docRef = doc(database, eventId, 'memo');
    try {
      await updateDoc(docRef, { [data.memoId]: data });

      const afterUpdateMemoData = [...currentMemoData].map((memo) => {
        if (memo.memoId === data.memoId) return data;
        return memo;
      });
      return afterUpdateMemoData;
    } catch (e) {
      console.error('Error adding document: ', e);
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
      console.error('Error get document: ', error);
    }
  };

  const deleteMemo = async (memoId: number) => {
    const docRef = doc(database, eventId, 'memo');
    try {
      await updateDoc(docRef, { [memoId]: deleteField() });

      const afterDeleteMemoData = [...currentMemoData].filter(
        (memo) => memo.memoId !== memoId,
      );
      return afterDeleteMemoData;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return {
    addMemo,
    updateMemo,
    getMemoList,
    deleteMemo,
  };
};
