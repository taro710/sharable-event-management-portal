'use client';

import { forwardRef } from 'react';
import style from './Input.module.scss';

type Props = JSX.IntrinsicElements['input'] & {
  label: string;
};

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { label, ...inputProps } = props;

  return (
    <div className={style['input-component']}>
      <label className={style['caption']}>{label}</label>
      <input {...inputProps} className={style['input']} ref={ref} />
    </div>
  );
});

export default Input;
