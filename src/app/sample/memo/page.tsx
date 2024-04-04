'use client';

import { NextPage } from 'next';
import { useState } from 'react';

import DialogMemoAdding from '@/components/Dialog/DialogMemoAdding';
import DialogMemoEdit from '@/components/Dialog/DialogMemoEdit';
import FadeIn from '@/components/FadeIn';
import IconAdd from '@/components/Icon/IconAdd';
import IconEdit from '@/components/Icon/IconEdit';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  return (
    <>
      <FadeIn className={style['memo-panel']}>
        <div className={style['memo']}>
          <div
            className={style['icon']}
            onClick={() => setIsEditDialogOpen(true)}>
            <IconEdit />
          </div>
          <p className={style['text']}>
            ■ 予約通知
            <br />
            キャンプ場　　　　　 : 〇〇 Camp Base
            <br />
            予約日時　　　　　　 : 2023年08月10日(木) 12時27分
            <br />
            予約詳細番号　　　　 : AAAAAA-12345678
            <br />
            <br />
            ■ ご予約プラン
            <br />
            <br />
            予約施設　　　　　　 : 星空サイト
            <br />
            チェックイン日時　　 : 2023年09月23日(土) 13時00分
            <br />
            チェックアウト日時　 : 2023年09月24日(日) 11時00分
            <br />
            キャンプ種別　　　　 : 宿泊キャンプ
            <br />
            宿泊日数　　　　　　 : 1泊2日
            <br />
            人数　　　　　　　　 : 大人 5人／小学生以上 0人／未就学児
            0人／ペット 0匹
            <br />
            利用料総額　　　　　 : 5,500円
            <br />
            【お支払い料金　　　 : 5,500円】
            <br />
            <br />
            ◾️集合時間
            <br />
            池袋駅7:30
            <br />
            <br />
            ◾️スーパー
            <br />
            https://maps.app.goo.gl/9hdC9GUTCWBf3SVx6?g_st=ic
          </p>
        </div>
        <div className={style['memo']}>
          <div
            className={style['icon']}
            onClick={() => setIsEditDialogOpen(true)}>
            <IconEdit />
          </div>
          <p className={style['text']}>
            ■ 温泉
            <br />
            ここ行きたい
            <br />
            https://maps.app.goo.gl/RcyFpguE9jNrKWfE9
          </p>
        </div>
        <div className={style['memo']}>
          <div
            className={style['icon']}
            onClick={() => setIsEditDialogOpen(true)}>
            <IconEdit />
          </div>
          <p className={style['text']}>
            ■ 温泉
            <br />
            ここ行きたい
            <br />
            https://maps.app.goo.gl/RcyFpguE9jNrKWfE9
          </p>
        </div>
        <div className={style['memo']}>
          <div
            className={style['icon']}
            onClick={() => setIsEditDialogOpen(true)}>
            <IconEdit />
          </div>
          <p className={style['text']}>
            ■ 温泉
            <br />
            ここ行きたい
            <br />
            https://maps.app.goo.gl/RcyFpguE9jNrKWfE9
          </p>
        </div>
      </FadeIn>
      <button
        className={style['add-button']}
        onClick={() => setIsAddDialogOpen(true)}>
        <IconAdd />
      </button>

      <DialogMemoAdding
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        handleSubmit={() => {}}
      />
      <DialogMemoEdit
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        handleSubmit={() => {}}
      />
    </>
  );
};

export default DashBoard;
