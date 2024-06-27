import { doc, getDoc } from 'firebase/firestore';

import { EventData } from '@/domain/event';
import { database } from '@/firebase';

type Props = {
  pathname: string;
};

const Meta = async ({ pathname }: Props) => {
  const [, eventId] = pathname.split('/'); //TODO: この位置にeventIdが来ない場合もある

  const getEvent = async () => {
    if (!eventId) return undefined;
    const docRef = doc(database, eventId, 'event');

    try {
      const document = await getDoc(docRef);
      const eventData = document?.data() as EventData | undefined;
      return eventData;
    } catch (error) {
      throw new Error('Error get document');
    }
  };

  const event = await getEvent();

  return (
    <>
      <title>{event?.eventName}</title>
      <meta content={event?.eventName} property="og:title" />
      <meta content={event?.message} property="og:description" />
    </>
  );
};
export default Meta;
