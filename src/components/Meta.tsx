import { EventData } from '@/domain/event';

type Props = {
  event: EventData | undefined;
};

const Meta = ({ event }: Props) => {
  const { eventName: title, message: description } = event || {};

  return (
    <>
      {/* FIXME: 代替テキスト */}
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={title} property="og:title" />
      <meta
        content={description || 'Event management tool. Share and Edit.'}
        property="og:description"
      />
    </>
  );
};
export default Meta;
