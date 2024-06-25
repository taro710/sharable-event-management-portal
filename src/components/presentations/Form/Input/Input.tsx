'use client';

import clsx from 'clsx';
import { forwardRef } from 'react';

import style from './Input.module.scss';

type Props = JSX.IntrinsicElements['input'] & {
  label: string;
  isRequired?: boolean;
  hasError?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { label, isRequired, hasError, ...inputProps } = props;

  return (
    <div className={style['input-component']}>
      <label className={style.caption}>
        {label}
        {isRequired ? <span className={style.required}>*</span> : null}
      </label>
      <input
        {...inputProps}
        className={clsx(style.input, hasError && style['-error'])}
        ref={ref}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
