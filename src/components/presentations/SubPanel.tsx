'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import DialogOverviewEdit from '@/components/presentations/Dialog/DialogOverviewEdit';
import IconEdit from '@/components/presentations/Icon/IconEdit';
import { EventData, useEvent } from '@/hooks/useEvent';
import { useResponsive } from '@/hooks/useResponsive';

import style from './SubPanel.module.scss';

type Props = {
  isOpen?: boolean;
  eventInfo: EventData;
};
const SubPanel = ({ isOpen = true, eventInfo }: Props) => {
  const { isSp } = useResponsive();
  const router = useRouter();
  const { getEvent, updateEvent } = useEvent('event01');

  const [event, setEvent] = useState<EventData>();
  useEffect(() => {
    (async () => {
      const data = await getEvent();
      if (data === undefined) return;
      setEvent(data);
    })();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleClickEdit = () => {
    if (isSp) {
      router.push('sdfasdf/edit'); // TODO: /asdasfasdf/edit
      return;
    }
    setIsDialogOpen(true);
  };

  if (event === undefined) return null; // TODO:

  return (
    <>
      <div className={style['sub-panel']}>
        <div className={style['body']}>
          <div className={style['body2']}>
            <div className={style['header']}>
              <h1 className={style['title']}>{event.eventName}</h1>
              {isOpen && (
                <div className={style['icon']} onClick={handleClickEdit}>
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
                      <td className={style['text']}>{event.meetingPlace}</td>
                    </tr>
                  )}
                  {eventInfo.dissolutionPlace && (
                    <tr className={style['row']}>
                      <td className={style['caption']}>解散場所</td>
                      <td className={style['text']}>
                        {event.dissolutionPlace}
                      </td>
                    </tr>
                  )}
                  {eventInfo.startDate && (
                    <tr className={style['row']}>
                      <td className={style['caption']}>集合時間</td>
                      <td className={style['text']}>{event.startDate}</td>
                    </tr>
                  )}
                  {eventInfo.endDate && (
                    <tr className={style['row']}>
                      <td className={style['caption']}>解散時間</td>
                      <td className={style['text']}>{event.endDate}</td>
                    </tr>
                  )}
                  <tr className={style['row']}>
                    <td className={style['caption']}>参加者</td>
                    <td className={style['text']}>
                      {event.members.join(', ')}
                    </td>
                  </tr>
                  {eventInfo.message && (
                    <tr className={style['row']}>
                      <td className={style['caption']}>メッセージ</td>
                      <td className={style['text']}>{event.message}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <DialogOverviewEdit
        event={event}
        isOpen={isDialogOpen}
        closeDialog={() => setIsDialogOpen(false)}
        handleSubmit={updateEvent}
      />
    </>
  );
};

export default SubPanel;
