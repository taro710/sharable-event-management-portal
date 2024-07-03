'use client';

import clsx from 'clsx';
import { forwardRef, useId } from 'react';

import style from './Input.module.scss';

type Props = JSX.IntrinsicElements['input'] & {
  label: string;
  isRequired?: boolean;
  hasError?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { label, isRequired, hasError, ...inputProps } = props;

  const id = useId();

  return (
    <div className={style['input-component']}>
      <label aria-hidden className={style.caption} htmlFor={id}>
        {label}
        {isRequired ? <span className={style.required}>*</span> : null}
      </label>
      <input
        {...inputProps}
        aria-label={label}
        className={clsx(style.input, hasError && style['-error'])}
        id={id}
        ref={ref}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
