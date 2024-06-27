'use client';

import { forwardRef } from 'react';

import style from './TagCheckbox.module.scss';

type Props = JSX.IntrinsicElements['input'] & {
  label: string;
};

const TagCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ label, ...inputProps }: Props, ref) => (
      <label className={style['checkbox-component']}>
        <input
          className={style.hidden}
          type="checkbox"
          {...inputProps}
          ref={ref}
        />
        <div className={style.visible}>
          <span className={style.text}>{label}</span>
        </div>
      </label>
    ),
);

TagCheckbox.displayName = 'TagCheckbox';

export default TagCheckbox;
