'use client';

import { useAtom } from 'jotai';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { eventAtom } from '@/atoms/eventAtom';
import DialogOverviewEdit from '@/components/presentations/Dialog/DialogOverviewEdit';
import IconEdit from '@/components/presentations/Icon/IconEdit';
import { useEvent } from '@/hooks/useEvent';
import { useResponsive } from '@/hooks/useResponsive';

import style from './SubPanel.module.scss';

type Props = {
  isOpen?: boolean;
};
const SubPanel = ({ isOpen = true }: Props) => {
  const { isSp } = useResponsive();
  const router = useRouter();
  const eventId = useParams()?.eventId as string;
  const { getEvent, updateEvent } = useEvent(eventId);

  const [event, setEvent] = useAtom(eventAtom);
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
      router.push(`/edit`);
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
                  {event.meetingPlace && (
                    <tr className={style['row']}>
                      <td className={style['caption']}>集合場所</td>
                      <td className={style['text']}>{event.meetingPlace}</td>
                    </tr>
                  )}
                  {event.dissolutionPlace && (
                    <tr className={style['row']}>
                      <td className={style['caption']}>解散場所</td>
                      <td className={style['text']}>
                        {event.dissolutionPlace}
                      </td>
                    </tr>
                  )}
                  {(event.startDate || event.startTime) && (
                    <tr className={style['row']}>
                      <td className={style['caption']}>集合日時</td>
                      <td className={style['text']}>
                        {event.startDate} {event.startTime}
                      </td>
                    </tr>
                  )}
                  {(event.endDate || event.endTime) && (
                    <tr className={style['row']}>
                      <td className={style['caption']}>解散日時</td>
                      <td className={style['text']}>
                        {event.endDate} {event.endTime}
                      </td>
                    </tr>
                  )}
                  <tr className={style['row']}>
                    <td className={style['caption']}>参加者</td>
                    <td className={style['text']}>
                      {event.members.join(', ')}
                    </td>
                  </tr>
                  {event.message && (
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
        isOpen={isDialogOpen}
        closeDialog={() => setIsDialogOpen(false)}
        handleSubmit={updateEvent}
      />
    </>
  );
};

export default SubPanel;
