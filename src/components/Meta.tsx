type Props = {
  title?: string;
  description?: string;
};

const Meta = ({ title, description }: Props) => (
  <>
    {/* FIXME: 代替テキスト */}
    <title>{title || 'SEMP'}</title>
    <meta content={description} name="description" />
    <meta content={title} property="og:title" />
    <meta
      content={description || 'Event management tool. Share and Edit.'}
      property="og:description"
    />
  </>
);
export default Meta;
