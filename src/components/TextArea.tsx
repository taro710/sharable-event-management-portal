'use client';

import { forwardRef } from 'react';
import style from './TextArea.module.scss';

type Props = JSX.IntrinsicElements['textarea'] & {
  label: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, Props>((props: Props, ref) => {
  const { label, ...inputProps } = props;

  return (
    <div className={style['input-component']}>
      <label className={style['caption']}>{label}</label>
      <textarea {...inputProps} className={style['input']} ref={ref} />
    </div>
  );
});

export default TextArea;
