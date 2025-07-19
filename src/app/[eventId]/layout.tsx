import { headers } from 'next/headers';

import { EventApi } from '@/api/eventApi';
import Meta from '@/components/Meta';
import ClientLayout from '@/components/containers/ClientLayout';

const PageLayout = async ({ children }: { children: React.ReactNode }) => {
  const pathname = headers().get('x-pathname') || '';
  const [, eventId] = pathname.split('/'); //TODO: この位置にeventIdが来ない場合もある

  const eventApi = new EventApi();
  const event = await eventApi.get(eventId);

  return (
    <>
      <Meta description={event.message} title={event.eventName} />
      <ClientLayout>{children}</ClientLayout>
    </>
  );
};
export default PageLayout;
