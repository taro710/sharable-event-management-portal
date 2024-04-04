'use client';

import style from './TextArea.module.scss';

type Props = JSX.IntrinsicElements['textarea'] & {
  label: string;
};

const TextArea = (props: Props) => {
  const { label, ...inputProps } = props;

  return (
    <div className={style['input-component']}>
      <label className={style['caption']}>{label}</label>
      <textarea {...inputProps} className={style['input']} />
    </div>
  );
};

export default TextArea;
