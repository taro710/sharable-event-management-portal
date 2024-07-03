'use client';

import { useId } from 'react';

import style from './Checkbox.module.scss';

type Props = JSX.IntrinsicElements['input'] & {
  label: string;
};
const Checkbox = (props: Props) => {
  const { label, ...inputProps } = props;

  const id = useId();

  return (
    <div className={style['checkbox-wrapper-15']}>
      <input
        {...inputProps}
        aria-label={label}
        className={style['inp-cbx']}
        id={id}
        type="checkbox"
      />

      <label aria-hidden className={style.check} htmlFor={id}>
        <svg>
          <polyline points="1 5 4 8 11 1" />
        </svg>
      </label>

      <span aria-hidden className={style.label}>
        {label}
      </span>
    </div>
  );
};

export default Checkbox;
