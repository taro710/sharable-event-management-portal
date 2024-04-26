import { doc, getDoc } from 'firebase/firestore';

import { EventData } from '@/domain/event';
import { database } from '@/firebase';

type Props = {
  pathname: string;
};
const Meta = async ({ pathname }: Props) => {
  const eventId = pathname.split('/')[1]; //TODO: この位置にeventIdが来ない場合もある

  const getEvent = async () => {
    if (!eventId) return;
    const docRef = doc(database, eventId, 'event');

    try {
      const document = await getDoc(docRef);
      const eventData = document?.data() as EventData | undefined;
      return eventData;
    } catch (error) {
      console.error('Error get document: ', error);
    }
  };

  const event = await getEvent();

  return (
    <>
      <title>{event?.eventName}</title>
      <meta property="og:title" content={event?.eventName} />
      <meta property="og:description" content={event?.message} />
    </>
  );
};
export default Meta;
