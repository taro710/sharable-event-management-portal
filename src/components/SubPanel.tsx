'use client';

import { useState } from 'react';

import DialogOverviewEdit from '@/components/Dialog/DialogOverviewEdit';
import IconEdit from '@/components/Icon/IconEdit';

import style from './SubPanel.module.scss';

export type EventInfo = {
  eventName: string;
  members: string[];
  startDate?: string;
  endDate?: string;
  meetingPlace?: string;
  dissolutionPlace?: string;
  message?: string;
};

type Props = {
  isOpen?: boolean;
  eventInfo: EventInfo;
};
const SubPanel = ({ isOpen = true, eventInfo }: Props) => {
  const members = ['たろ', 'そめ', 'ハマ', '黒田', 'フラ', 'りゅー'];

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <div className={style['sub-panel']}>
        <div className={style['body']}>
          <div className={style['body2']}>
            <div className={style['header']}>
              <h1 className={style['title']}>Nagano Camp</h1>
              {isOpen && (
                <div
                  className={style['icon']}
                  onClick={() => setIsDialogOpen(true)}>
                  <IconEdit />
                </div>
              )}
            </div>

            <div className={style['body']}>
              <table className={style['overview-table']}>
                <tbody className={style['table']}>
                  {eventInfo.meetingPlace && (
                    <tr className={style['row']}>
                      <td className={style['caption']}>集合場所</td>
                      <td className={style['text']}>池袋駅</td>
                    </tr>
                  )}
                  {eventInfo.dissolutionPlace && (
                    <tr className={style['row']}>
                      <td className={style['caption']}>解散場所</td>
                      <td className={style['text']}>池袋駅</td>
                    </tr>
                  )}
                  {eventInfo.startDate && (
                    <tr className={style['row']}>
                      <td className={style['caption']}>集合時間</td>
                      <td className={style['text']}>08:30</td>
                    </tr>
                  )}
                  {eventInfo.endDate && (
                    <tr className={style['row']}>
                      <td className={style['caption']}>解散時間</td>
                      <td className={style['text']}>08:30</td>
                    </tr>
                  )}
                  <tr className={style['row']}>
                    <td className={style['caption']}>参加者</td>
                    <td className={style['text']}>{members.join(', ')}</td>
                  </tr>
                  {eventInfo.message && (
                    <tr className={style['row']}>
                      <td className={style['caption']}>メッセージ</td>
                      <td className={style['text']}>
                        スウェーデントーチやりたいスウェーデントーチやりたいスウェーデントーチやりたいスウェーデントーチやりたい
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <DialogOverviewEdit
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        handleSubmit={() => {}}
      />
    </>
  );
};

export default SubPanel;
