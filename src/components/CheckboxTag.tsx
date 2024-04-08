'use client';

import { forwardRef } from 'react';
import style from './CheckboxTag.module.scss';

type Props = JSX.IntrinsicElements['input'] & {
  label: string;
};

const CheckboxTag = forwardRef<HTMLInputElement, Props>(
  ({ label, ...inputProps }: Props, ref) => {
    return (
      <label className={style['checkbox-component']}>
        <input
          type="checkbox"
          className={style['hidden']}
          {...inputProps}
          ref={ref}
        />
        <div className={style['visible']}>
          <span className={style['text']}>{label}</span>
        </div>
      </label>
    );
  },
);

export default CheckboxTag;
