'use client';

import { forwardRef, useId } from 'react';

import style from './TagCheckbox.module.scss';

type Props = JSX.IntrinsicElements['input'] & {
  label: string;
};

const TagCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ label, ...inputProps }: Props, ref) => {
    const id = useId();

    return (
      <label className={style['checkbox-component']} htmlFor={id} tabIndex={0}>
        <input
          {...inputProps}
          className={style.hidden}
          id={id}
          ref={ref}
          type="checkbox"
        />
        <div className={style.visible}>
          <span className={style.text}>{label}</span>
        </div>
      </label>
    );
  },
);

TagCheckbox.displayName = 'TagCheckbox';

export default TagCheckbox;
