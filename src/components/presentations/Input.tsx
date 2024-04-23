'use client';

import { forwardRef } from 'react';

import style from './Input.module.scss';

type Props = JSX.IntrinsicElements['input'] & {
  label: string;
  isRequired?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { label, isRequired, ...inputProps } = props;

  return (
    <div className={style['input-component']}>
      <label className={style['caption']}>
        {label}
        {isRequired && <span className={style['required']}>*</span>}
      </label>
      <input {...inputProps} className={style['input']} ref={ref} />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
